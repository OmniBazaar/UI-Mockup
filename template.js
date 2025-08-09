/**
 * OmniBazaar HTML Template System
 * Provides consistent header and footer across all HTML pages
 * Mirrors the TypeScript AppLayout component functionality
 */

// Template configuration
const TEMPLATE_CONFIG = {
    brandName: 'OmniBazaar',
    logoPath: 'OmniBazaar Globe-clear-256x256.png',
    navigation: [
        { label: 'Products', href: 'index.html' },
        { label: 'Services', href: 'services.html' },
        { label: 'Art', href: 'art-nft.html' },
        { label: 'Gaming', href: 'gaming.html' },
        { label: 'Financial', href: 'financial.html' },
        { label: 'Crypto', href: 'dex-swap.html' },
        { label: 'Personal', href: 'personal.html' },
        { label: 'Wallet', href: 'wallet.html' }
    ],
    footerSections: {
        omnibazaar: {
            title: 'OmniBazaar',
            links: [
                { label: 'Company', href: 'about.html' },
                { label: 'Mission', href: 'mission.html' },
                { label: 'Careers', href: 'careers.html' },
                { label: 'Press', href: 'press.html' },
                { label: 'Blog', href: 'blog.html' }
            ]
        },
        support: {
            title: 'Support',
            links: [
                { label: 'Help Center', href: 'help.html' },
                { label: 'Safety', href: 'safety.html' },
                { label: 'Community', href: 'community.html' },
                { label: 'Contact', href: 'contact.html' },
                { label: 'FAQ', href: 'faq.html' }
            ]
        },
        legal: {
            title: 'Legal',
            links: [
                { label: 'Terms', href: 'terms.html' },
                { label: 'Privacy', href: 'privacy.html' },
                { label: 'Cookies', href: 'cookies.html' },
                { label: 'Disputes', href: 'disputes.html' },
                { label: 'KYC/AML', href: 'kyc.html' }
            ]
        },
        platform: {
            title: 'Platform',
            links: [
                { label: 'Wallet', href: 'wallet.html' },
                { label: 'Trading', href: 'dex-swap.html' },
                { label: 'DeFi', href: 'financial.html' },
                { label: 'Staking', href: 'staking.html' },
                { label: 'API Docs', href: 'docs.html' },
                { label: 'Status', href: 'status.html' }
            ]
        }
    },
    footerDescription: 'OmniBazaar is a world-wide network of e-commerce marketplaces designed to eliminate middlemen and reduce transaction fees via blockchain technology. We are building an advanced marketplace software template that will allow tens or hundreds of thousands of individuals and small businesses to open localized and specialized marketplaces around the world. With the integrated OmniCoin cryptocurrency, OmniBazaar offers secure transactions, reputation tracking, distributed escrow, and incentives for participation. Our vision is to expand access to global commerce, especially for the 1.5 billion unbanked and underbanked people worldwide.',
    profileMenu: [
        { label: 'User Profile', href: 'profile.html' },
        { label: 'Settings', href: 'settings.html' },
        { label: 'Help', href: 'help.html' },
        { label: 'Logout', href: 'auth-login.html' }
    ]
};

/**
 * Generate the header HTML
 * @param {string} activePage - Current page identifier for highlighting active nav
 * @returns {string} HTML string for the header
 */
function generateHeader(activePage = '') {
    const navLinks = TEMPLATE_CONFIG.navigation.map(link => {
        const isActive = link.href === activePage ? 'active' : '';
        return `<a href="${link.href}" class="nav-link ${isActive}">${link.label}</a>`;
    }).join('');
    
    return `
    <!-- Header -->
    <header class="header">
        <div class="header-content">
            <div class="header-left">
                <a href="index.html" class="logo">
                    <img src="${TEMPLATE_CONFIG.logoPath}" alt="${TEMPLATE_CONFIG.brandName} Logo" class="logo-img">
                    <span class="logo-text">${TEMPLATE_CONFIG.brandName}</span>
                </a>
            </div>
            
            <nav class="nav-menu">
                ${navLinks}
            </nav>
            
            <div class="header-right">
                <div class="search-container">
                    <input type="text" class="search-input" placeholder="Search marketplace...">
                    <button class="search-button">🔍</button>
                </div>
                
                <div class="header-actions">
                    <button class="icon-button" title="Notifications">
                        <span class="notification-badge">3</span>
                        🔔
                    </button>
                    
                    <button class="icon-button" title="Toggle Theme" onclick="toggleTheme()">
                        🌙
                    </button>
                    
                    <div class="dropdown-container">
                        <button class="icon-button" title="Language">
                            🌐
                        </button>
                    </div>
                    
                    <div class="dropdown-container">
                        <button class="profile-button" onclick="toggleProfileMenu()">
                            <span class="profile-avatar">👤</span>
                            <span class="profile-name">User</span>
                            <span class="dropdown-arrow">▼</span>
                        </button>
                        
                        <div class="dropdown-menu" id="profileMenu" style="display: none;">
                            ${TEMPLATE_CONFIG.profileMenu.map(item => 
                                `<a href="${item.href}" class="dropdown-item">${item.label}</a>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>`;
}

/**
 * Generate the footer HTML
 * @returns {string} HTML string for the footer
 */
function generateFooter() {
    const footerSections = Object.entries(TEMPLATE_CONFIG.footerSections).map(([key, section]) => `
        <div class="footer-section">
            <h3 class="footer-title">${section.title}</h3>
            <ul class="footer-links">
                ${section.links.map(link => 
                    `<li><a href="${link.href}">${link.label}</a></li>`
                ).join('')}
            </ul>
        </div>
    `).join('');
    
    return `
    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-grid">
                ${footerSections}
            </div>

            <div class="footer-bottom">
                <div class="footer-logo-section">
                    <img src="OmniBazaar Clear and black-- Global network.png" alt="OmniBazaar Logo" class="footer-logo">
                </div>
                <p style="margin-top: 0.25rem; margin-bottom: 0.25rem;">
                    ${TEMPLATE_CONFIG.footerDescription}
                </p>
                <p>© 2025 OmniBazaar. All rights reserved. Built with ❤️ for the decentralized future.</p>
            </div>
        </div>
    </footer>`;
}

/**
 * Initialize template on page load
 * Automatically injects header and footer if placeholders exist
 */
function initializeTemplate() {
    // Get the current page from the URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Insert header if placeholder exists
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = generateHeader(currentPage);
    }
    
    // Insert footer if placeholder exists
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = generateFooter();
    }
    
    // Initialize event handlers
    initializeEventHandlers();
}

/**
 * Initialize common event handlers for template elements
 */
function initializeEventHandlers() {
    // Theme toggle
    window.toggleTheme = function() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        
        const themeButton = document.querySelector('[title="Toggle Theme"]');
        if (themeButton) {
            themeButton.textContent = isDark ? '🌙' : '☀️';
        }
    };
    
    // Profile menu toggle
    window.toggleProfileMenu = function() {
        const menu = document.getElementById('profileMenu');
        if (menu) {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        }
    };
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const profileDropdown = document.querySelector('.dropdown-container:last-child');
        const menu = document.getElementById('profileMenu');
        if (menu && profileDropdown && !profileDropdown.contains(event.target)) {
            menu.style.display = 'none';
        }
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    window.location.href = `marketplace-search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeButton = document.querySelector('[title="Toggle Theme"]');
    if (themeButton) {
        themeButton.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTemplate);
} else {
    initializeTemplate();
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateHeader, generateFooter, initializeTemplate, TEMPLATE_CONFIG };
}