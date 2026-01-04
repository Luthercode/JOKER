/* =====================================================
   TASKFLOW DASHBOARD - JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initAnimations();
    initTasks();
});

// Sidebar Toggle
function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }
}

// Animate elements on load
function initAnimations() {
    // Animate stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
    
    // Animate chart bars
    const chartBars = document.querySelectorAll('.bar-fill');
    chartBars.forEach((bar, index) => {
        const height = bar.style.height || getComputedStyle(bar.parentElement).getPropertyValue('--height');
        bar.style.height = '0';
        
        setTimeout(() => {
            bar.style.transition = 'height 0.6s ease';
            bar.style.height = height;
        }, 500 + (index * 100));
    });
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 0.8s ease';
            bar.style.width = width;
        }, 800 + (index * 150));
    });
}

// Task interactions
function initTasks() {
    const taskCheckboxes = document.querySelectorAll('.task-checkbox input');
    
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const taskItem = e.target.closest('.task-item');
            
            if (e.target.checked) {
                taskItem.classList.add('completed');
                
                // Animate completion
                taskItem.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    taskItem.style.transform = 'scale(1)';
                }, 150);
            } else {
                taskItem.classList.remove('completed');
            }
            
            updateTaskCount();
        });
    });
}

// Update task counter
function updateTaskCount() {
    const totalTasks = document.querySelectorAll('.task-item').length;
    const completedTasks = document.querySelectorAll('.task-item.completed').length;
    const pendingTasks = totalTasks - completedTasks;
    
    const badge = document.querySelector('.nav-badge');
    if (badge) {
        badge.textContent = pendingTasks;
        
        // Animate badge
        badge.style.transform = 'scale(1.2)';
        setTimeout(() => {
            badge.style.transform = 'scale(1)';
        }, 200);
    }
}

// Simulate real-time updates
setInterval(() => {
    const activityTimes = document.querySelectorAll('.activity-time');
    activityTimes.forEach(time => {
        const currentText = time.textContent;
        if (currentText.includes('min')) {
            const minutes = parseInt(currentText);
            if (!isNaN(minutes) && minutes < 59) {
                // Update would happen here in a real app
            }
        }
    });
}, 60000);
