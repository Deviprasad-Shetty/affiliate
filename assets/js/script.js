// Function to generate a unique transaction ID
function generateTransactionId() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp.substring(0, 5)}-${randomPart}`.toUpperCase();
}

// Function to display order details
function displayOrderDetails() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('orderDate').textContent = now.toLocaleDateString('en-US', options);
    
    const transactionId = generateTransactionId();
    document.getElementById('orderNumber').textContent = transactionId;
    
    return transactionId;
}

// Function to push data to GTM
function pushToGTM(transactionId) {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
        'event': 'purchase',
        'transaction_id' : transactionId,
        'ecommerce': {
            'transaction_id': transactionId,
            'affiliation': 'Online Store',
            'value': 103.18,
            'tax': 7.20,
            'shipping': 5.99,
            'currency': 'USD',
            'items': [{
                'item_name': 'Premium Runner Sneakers',
                'item_id': 'NKE-RN-001',
                'price': 89.99,
                'item_brand': 'Nike-Like',
                'item_category': 'Footwear',
                'item_variant': 'Black/White',
                'quantity': 1
            }]
        }
    });
}

// Initialize thank you page
function initThankYouPage() {
    if (document.getElementById('orderNumber')) {
        const transactionId = displayOrderDetails();
        pushToGTM(transactionId);
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initThankYouPage);
