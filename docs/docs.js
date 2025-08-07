// Documentation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Sidebar navigation functionality
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const sections = document.querySelectorAll('.doc-section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active section highlighting
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.sidebar-nav .nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);
    
    // Initial active section check
    updateActiveSection();
    
    // Mobile sidebar toggle
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !navToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Code block syntax highlighting (if needed)
    const codeBlocks = document.querySelectorAll('code');
    codeBlocks.forEach(block => {
        // Add copy button functionality
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy code';
        
        copyButton.addEventListener('click', function() {
            const textToCopy = block.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show success feedback
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.background = 'var(--success)';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                    this.style.background = '';
                }, 2000);
            });
        });
        
        // Insert copy button before the code block
        block.parentNode.insertBefore(copyButton, block);
    });
    
    // Add CSS for copy buttons
    const copyButtonStyles = `
        <style>
            .copy-button {
                position: absolute;
                top: 8px;
                right: 8px;
                background: var(--surface-elevated);
                border: 1px solid var(--border);
                border-radius: var(--radius-sm);
                padding: 4px 8px;
                cursor: pointer;
                color: var(--text-secondary);
                transition: all var(--transition-normal);
                z-index: 10;
            }
            
            .copy-button:hover {
                background: var(--surface-highest);
                color: var(--text);
            }
            
            .example {
                position: relative;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', copyButtonStyles);
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Search functionality (if needed)
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search documentation...';
    searchInput.className = 'docs-search';
    
    const searchStyles = `
        <style>
            .docs-search {
                width: 100%;
                padding: var(--spacing-sm) var(--spacing-md);
                border: 1px solid var(--border);
                border-radius: var(--radius-md);
                background: var(--surface-elevated);
                color: var(--text);
                font-size: var(--font-size-sm);
                margin-bottom: var(--spacing-md);
            }
            
            .docs-search:focus {
                outline: none;
                border-color: var(--primary);
                box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
            }
            
            .docs-search::placeholder {
                color: var(--text-muted);
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', searchStyles);
    
    // Insert search input into sidebar
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (sidebarNav) {
        sidebarNav.insertBefore(searchInput, sidebarNav.firstChild);
    }
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        navLinks.forEach(link => {
            const linkText = link.textContent.toLowerCase();
            const listItem = link.parentElement;
            
            if (linkText.includes(searchTerm)) {
                listItem.style.display = 'block';
            } else {
                listItem.style.display = 'none';
            }
        });
    });
    
    // Table of contents generation
    function generateTableOfContents() {
        const tocContainer = document.createElement('div');
        tocContainer.className = 'table-of-contents';
        tocContainer.innerHTML = '<h4>On This Page</h4><ul></ul>';
        
        const tocList = tocContainer.querySelector('ul');
        const headings = document.querySelectorAll('.doc-section h2, .doc-section h3');
        
        headings.forEach(heading => {
            const level = heading.tagName === 'H2' ? 2 : 3;
            const text = heading.textContent;
            const id = heading.id || text.toLowerCase().replace(/\s+/g, '-');
            
            // Add ID if not present
            if (!heading.id) {
                heading.id = id;
            }
            
            const listItem = document.createElement('li');
            listItem.className = `toc-level-${level}`;
            
            const link = document.createElement('a');
            link.href = `#${id}`;
            link.textContent = text;
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
        
        // Add TOC styles
        const tocStyles = `
            <style>
                .table-of-contents {
                    background: var(--surface-elevated);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-lg);
                    margin: var(--spacing-lg) 0;
                    position: sticky;
                    top: 100px;
                }
                
                .table-of-contents h4 {
                    margin: 0 0 var(--spacing-md);
                    color: var(--text);
                }
                
                .table-of-contents ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .table-of-contents li {
                    margin-bottom: var(--spacing-xs);
                }
                
                .table-of-contents a {
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-size: var(--font-size-sm);
                    transition: color var(--transition-normal);
                }
                
                .table-of-contents a:hover {
                    color: var(--primary);
                }
                
                .toc-level-3 {
                    margin-left: var(--spacing-md);
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', tocStyles);
        
        // Insert TOC after the first section
        const firstSection = document.querySelector('.doc-section');
        if (firstSection) {
            firstSection.parentNode.insertBefore(tocContainer, firstSection.nextSibling);
        }
    }
    
    // Generate table of contents
    generateTableOfContents();
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Escape to clear search
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.blur();
        }
    });
    
    // Progress indicator
    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }
    
    // Add progress bar styles
    const progressStyles = `
        <style>
            .progress-bar {
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, var(--primary) 0%, var(--primary-hover) 100%);
                z-index: 1000;
                transition: width 0.1s ease;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', progressStyles);
    
    // Update progress on scroll
    window.addEventListener('scroll', updateProgress);
    
    // Initial progress update
    updateProgress();
    
    // Print styles
    const printStyles = `
        <style>
            @media print {
                .sidebar, .navbar, .footer, .nav-toggle, .copy-button, .progress-bar {
                    display: none !important;
                }
                
                .main-content {
                    margin-left: 0 !important;
                }
                
                .content-wrapper {
                    padding: 0 !important;
                }
                
                .doc-section {
                    page-break-inside: avoid;
                }
                
                h1, h2, h3, h4 {
                    page-break-after: avoid;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', printStyles);
    
    console.log('CropStudio Documentation loaded successfully!');
});
