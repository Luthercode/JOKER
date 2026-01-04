/* =====================================================
   QUICKAPI - Interactive Documentation JS
   ===================================================== */

// Sample data for demo
const sampleUsers = [
    { id: 'usr_abc123', name: 'João Silva', email: 'joao@email.com', role: 'admin', created_at: '2026-01-01T10:00:00Z' },
    { id: 'usr_def456', name: 'Maria Santos', email: 'maria@email.com', role: 'user', created_at: '2026-01-02T14:30:00Z' },
    { id: 'usr_ghi789', name: 'Pedro Costa', email: 'pedro@email.com', role: 'user', created_at: '2026-01-03T09:15:00Z' },
    { id: 'usr_jkl012', name: 'Ana Oliveira', email: 'ana@email.com', role: 'moderator', created_at: '2026-01-04T16:45:00Z' },
    { id: 'usr_mno345', name: 'Lucas Ferreira', email: 'lucas@email.com', role: 'user', created_at: '2026-01-05T11:20:00Z' },
];

const sampleProducts = [
    { id: 'prod_001', name: 'Notebook Pro', price: 4999.99, stock: 50, category: 'Electronics' },
    { id: 'prod_002', name: 'Wireless Mouse', price: 149.99, stock: 200, category: 'Accessories' },
    { id: 'prod_003', name: 'Mechanical Keyboard', price: 599.99, stock: 75, category: 'Accessories' },
    { id: 'prod_004', name: '4K Monitor', price: 2499.99, stock: 30, category: 'Electronics' },
];

const sampleOrders = [
    { id: 'ord_001', user_id: 'usr_abc123', total: 5149.98, status: 'delivered', created_at: '2026-01-03T10:00:00Z' },
    { id: 'ord_002', user_id: 'usr_def456', total: 749.98, status: 'processing', created_at: '2026-01-04T14:30:00Z' },
    { id: 'ord_003', user_id: 'usr_abc123', total: 2499.99, status: 'shipped', created_at: '2026-01-05T09:00:00Z' },
];

// Simulate API delay
function simulateDelay(min = 200, max = 800) {
    return new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));
}

// Format JSON response
function formatJSON(data) {
    return JSON.stringify(data, null, 2);
}

// Show response in try-it box
function showResponse(elementId, data, status = 200) {
    const responseEl = document.getElementById(elementId);
    responseEl.classList.add('show');
    
    const statusColor = status >= 400 ? '#f85149' : '#3fb950';
    responseEl.innerHTML = `<span style="color: ${statusColor}">Status: ${status}</span>\n\n${formatJSON(data)}`;
}

// Test Authentication
async function testAuth() {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    
    const responseEl = document.getElementById('authResponse');
    responseEl.classList.add('show');
    responseEl.innerHTML = '<span style="color: #d29922">⏳ Enviando requisição...</span>';
    
    await simulateDelay();
    
    if (email === 'demo@quickapi.io' && password === 'demo123') {
        showResponse('authResponse', {
            success: true,
            data: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNyX2RlbW8iLCJlbWFpbCI6ImRlbW9AcXVpY2thcGkuaW8iLCJpYXQiOjE3MDQzNjU2MDAsImV4cCI6MTcwNDQ1MjAwMH0.demo_signature',
                expires_in: 86400,
                token_type: 'Bearer'
            }
        }, 200);
    } else {
        showResponse('authResponse', {
            success: false,
            error: {
                code: 'INVALID_CREDENTIALS',
                message: 'Email ou senha inválidos'
            }
        }, 401);
    }
}

// Test Get Users
async function testGetUsers() {
    const page = parseInt(document.getElementById('usersPage').value) || 1;
    const limit = parseInt(document.getElementById('usersLimit').value) || 5;
    
    const responseEl = document.getElementById('usersResponse');
    responseEl.classList.add('show');
    responseEl.innerHTML = '<span style="color: #d29922">⏳ Enviando requisição...</span>';
    
    await simulateDelay();
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedUsers = sampleUsers.slice(start, end);
    
    showResponse('usersResponse', {
        success: true,
        data: paginatedUsers,
        meta: {
            page: page,
            total: sampleUsers.length,
            per_page: limit,
            total_pages: Math.ceil(sampleUsers.length / limit)
        }
    }, 200);
}

// Test Create User
async function testCreateUser() {
    const name = document.getElementById('createName').value;
    const email = document.getElementById('createEmail').value;
    const password = document.getElementById('createPassword').value;
    
    const responseEl = document.getElementById('createResponse');
    responseEl.classList.add('show');
    responseEl.innerHTML = '<span style="color: #d29922">⏳ Enviando requisição...</span>';
    
    await simulateDelay();
    
    if (!name || !email || !password) {
        showResponse('createResponse', {
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Todos os campos são obrigatórios',
                fields: {
                    name: !name ? 'Campo obrigatório' : null,
                    email: !email ? 'Campo obrigatório' : null,
                    password: !password ? 'Campo obrigatório' : null
                }
            }
        }, 400);
        return;
    }
    
    if (password.length < 8) {
        showResponse('createResponse', {
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Senha deve ter no mínimo 8 caracteres'
            }
        }, 400);
        return;
    }
    
    const newUser = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        role: 'user',
        created_at: new Date().toISOString()
    };
    
    showResponse('createResponse', {
        success: true,
        message: 'Usuário criado com sucesso',
        data: newUser
    }, 201);
}

// Test Get Products
async function testGetProducts() {
    const responseEl = document.getElementById('productsResponse');
    responseEl.classList.add('show');
    responseEl.innerHTML = '<span style="color: #d29922">⏳ Enviando requisição...</span>';
    
    await simulateDelay();
    
    showResponse('productsResponse', {
        success: true,
        data: sampleProducts,
        meta: {
            total: sampleProducts.length
        }
    }, 200);
}

// Test Get Orders
async function testGetOrders() {
    const responseEl = document.getElementById('ordersResponse');
    responseEl.classList.add('show');
    responseEl.innerHTML = '<span style="color: #d29922">⏳ Enviando requisição...</span>';
    
    await simulateDelay();
    
    showResponse('ordersResponse', {
        success: true,
        data: sampleOrders,
        meta: {
            total: sampleOrders.length
        }
    }, 200);
}

// Copy code to clipboard
function copyCode(btn) {
    const codeBlock = btn.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copiado!';
        btn.style.background = '#3fb950';
        btn.style.borderColor = '#3fb950';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
        }, 2000);
    });
}

// Navigation active state
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.doc-section');

function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth scroll for nav links
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(item.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        section.style.display = text.includes(query) ? 'block' : 'none';
    });
});

// Theme toggle (demo)
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    themeToggle.textContent = themeToggle.textContent === '🌙' ? '☀️' : '🌙';
});

console.log('⚡ QuickAPI Documentation loaded successfully!');
