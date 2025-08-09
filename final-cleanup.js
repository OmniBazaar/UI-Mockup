#!/usr/bin/env node

/**
 * Final cleanup:
 * 1. Remove unnecessary page-container divs from marketplace-create and profile
 * 2. Add proper search dropdowns to index.html like in services.html
 */

const fs = require('fs');
const path = require('path');

// Remove unnecessary page-container divs but keep the CSS
function removePageContainerDiv(filename) {
    const filepath = path.join(__dirname, filename);
    let html = fs.readFileSync(filepath, 'utf8');
    
    // Remove the opening page-container div
    html = html.replace(
        /<div class="page-container">\s*\n/g,
        ''
    );
    
    // Since we removed the opening div, we need to remove one closing div
    // Find the last </div> before </main> and remove it
    html = html.replace(
        /(\s*)<\/div>(\s*<\/main>)/,
        '$1$2'
    );
    
    fs.writeFileSync(filepath, html);
    console.log(`✅ Cleaned up ${filename}`);
}

// Add the category selector to index.html
function addCategorySelectorToIndex() {
    const indexPath = path.join(__dirname, 'index.html');
    let indexHtml = fs.readFileSync(indexPath, 'utf8');
    
    // Check if it already has a category selector
    if (indexHtml.includes('category-selector-container') || indexHtml.includes('filter-bar')) {
        console.log('⏩ index.html already has category selectors');
        return;
    }
    
    // Create the category selector HTML
    const categorySelectorHTML = `
        <!-- Category Selector -->
        <div class="category-selector-container">
            <div class="selector-row">
                <div class="selector-group">
                    <label class="selector-label">Category</label>
                    <select class="category-select">
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing & Fashion</option>
                        <option value="home">Home & Garden</option>
                        <option value="toys">Toys & Games</option>
                        <option value="sports">Sports & Outdoors</option>
                        <option value="books">Books & Media</option>
                        <option value="automotive">Automotive</option>
                        <option value="health">Health & Beauty</option>
                    </select>
                </div>

                <div class="selector-group">
                    <label class="selector-label">Price Range</label>
                    <select class="category-select">
                        <option value="">Any Price</option>
                        <option value="0-25">Under 25 XOM</option>
                        <option value="25-50">25-50 XOM</option>
                        <option value="50-100">50-100 XOM</option>
                        <option value="100-500">100-500 XOM</option>
                        <option value="500+">Over 500 XOM</option>
                    </select>
                </div>

                <div class="selector-group">
                    <label class="selector-label">Sort By</label>
                    <select class="category-select">
                        <option value="relevance">Most Relevant</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest First</option>
                        <option value="rating">Highest Rated</option>
                    </select>
                </div>

                <div class="selector-group">
                    <label class="selector-label">Location</label>
                    <select class="category-select">
                        <option value="">All Locations</option>
                        <option value="local">Local Only</option>
                        <option value="national">National</option>
                        <option value="international">International</option>
                    </select>
                </div>
            </div>
        </div>
`;

    // Also add the CSS if it's not there
    const categorySelectorCSS = `
        /* Category Selector */
        .category-selector-container {
            background: var(--surface);
            border-radius: 1rem;
            padding: 2rem;
            margin-bottom: 3rem;
            box-shadow: var(--shadow-sm);
        }

        .selector-row {
            display: flex;
            gap: 2rem;
            align-items: center;
            flex-wrap: wrap;
        }

        .selector-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .selector-label {
            font-size: 1.2rem;
            font-weight: 500;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .category-select {
            padding: 1rem 1.4rem;
            border: 1px solid var(--border);
            border-radius: 0.8rem;
            background: var(--surface);
            color: var(--text-primary);
            font-size: 1.4rem;
            font-weight: 500;
            min-width: 18rem;
            cursor: pointer;
            transition: all 0.2s;
        }

        .category-select:hover {
            border-color: var(--primary-color);
        }

        .category-select:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(55, 51, 115, 0.1);
        }`;

    // Add CSS if not present
    if (!indexHtml.includes('category-selector-container')) {
        indexHtml = indexHtml.replace(
            '</style>',
            categorySelectorCSS + '\n    </style>'
        );
    }

    // Add the HTML after the page header
    indexHtml = indexHtml.replace(
        /(<div class="page-header">[\s\S]*?<\/div>)\s*\n/,
        '$1\n\n' + categorySelectorHTML + '\n'
    );

    fs.writeFileSync(indexPath, indexHtml);
    console.log('✅ Added category selectors to index.html');
}

// Main execution
console.log('🔧 Final cleanup...\n');

// Remove page-container divs
removePageContainerDiv('marketplace-create.html');
removePageContainerDiv('profile.html');

// Add category selectors to index
addCategorySelectorToIndex();

console.log('\n✨ Cleanup complete!');