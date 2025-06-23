document.addEventListener('DOMContentLoaded', function() {
      // 初始化所有轮播
      const carousels = document.querySelectorAll('.carousel-wrapper');
      
      carousels.forEach(wrapper => {
        const carousel = wrapper.querySelector('.carousel');
        const columns = wrapper.querySelectorAll('.column');
        const prevBtn = wrapper.querySelector('.carousel-btn.prev');
        const nextBtn = wrapper.querySelector('.carousel-btn.next');
        const navDotsContainer = wrapper.querySelector('.carousel-nav');
        const allLabels = wrapper.querySelectorAll('.image-label');
        
        let currentIndex = 0;
        const visibleColumns = wrapper.classList.contains('carousel-3-4') ? 5 : 3;
        const totalColumns = columns.length;
        
        // 初始化导航点
        function initDots() {
          navDotsContainer.innerHTML = '';
          const dotCount = totalColumns - visibleColumns + 1;
          
          for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('nav-dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.index = i;
            navDotsContainer.appendChild(dot);
          }
        }
        
        initDots();
        const dots = wrapper.querySelectorAll('.nav-dot');
        
        // 更新轮播位置
        function updateCarousel() {
          const columnWidth = 100 / visibleColumns;
          const offset = -currentIndex * columnWidth;
          carousel.style.transform = `translateX(${offset}%)`;
          
          // 更新按钮状态
          prevBtn.disabled = currentIndex === 0;
          nextBtn.disabled = currentIndex >= totalColumns - visibleColumns;
          
          // 更新活动点
          dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
          });
          
          // 更新滑块标签可见性
          updateSliderLabels();
        }
        
        // 更新滑块标签可见性
        function updateSliderLabels() {
          const sliders = wrapper.querySelectorAll('.image-comparison');
          
          sliders.forEach(slider => {
            const divider = slider.querySelector('.divider');
            const leftLabel = slider.querySelector('.image-label.left');
            const rightLabel = slider.querySelector('.image-label.right');
            const sliderWidth = slider.offsetWidth;
            const dividerPos = parseFloat(divider.style.left) || (sliderWidth / 2);
            const percent = (dividerPos / sliderWidth) * 100;
            
            // 根据分割线位置显示/隐藏标签
            if (percent < 5) { // 靠近左侧边缘
              leftLabel.style.opacity = '0';
              rightLabel.style.opacity = '1';
            } else if (percent >= 95) { // 靠近右侧边缘
              leftLabel.style.opacity = '1';
              rightLabel.style.opacity = '0';
            } else {
              leftLabel.style.opacity = '1';
              rightLabel.style.opacity = '1';
            }
          });
        }
        
        // 跳转到指定列
        function goToColumn(index) {
          currentIndex = index;
          updateCarousel();
        }
        
        // 下一列
        function nextColumn() {
          if (currentIndex < totalColumns - visibleColumns) {
            currentIndex++;
            updateCarousel();
          }
        }
        
        // 上一列
        function prevColumn() {
          if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
          }
        }
        
        // 初始化滑块
        function initSliders() {
          const sliders = wrapper.querySelectorAll('.image-comparison');
          
          sliders.forEach(slider => {
            const divider = slider.querySelector('.divider');
            const before = slider.querySelector('.image-before');
            const after = slider.querySelector('.image-after');
            let isDragging = false;
            
            // 设置初始分割线位置（居中）
            const sliderWidth = slider.offsetWidth;
            const initialPos = sliderWidth / 2;
            divider.style.left = `${initialPos}px`;
            before.style.clipPath = `inset(0 ${sliderWidth - initialPos}px 0 0)`;
            after.style.clipPath = `inset(0 0 0 ${initialPos}px)`;
            
            // 鼠标事件
            divider.addEventListener('mousedown', function(e) {
              isDragging = true;
              document.body.style.cursor = 'ew-resize';
              e.preventDefault();
            });
            
            function handleMove(clientX) {
              if (!isDragging) return;
              
              const sliderRect = slider.getBoundingClientRect();
              let x = clientX - sliderRect.left;
              
              x = Math.max(0, Math.min(x, sliderRect.width));
              
              before.style.clipPath = `inset(0 ${sliderRect.width - x}px 0 0)`;
              after.style.clipPath = `inset(0 0 0 ${x}px)`;
              divider.style.left = `${x}px`;
              
              // 拖动时更新标签可见性
              updateSliderLabels();
            }
            
            document.addEventListener('mousemove', function(e) {
              handleMove(e.clientX);
            });
            
            document.addEventListener('mouseup', function() {
              isDragging = false;
              document.body.style.cursor = '';
            });
            
            // 触摸事件
            divider.addEventListener('touchstart', function(e) {
              isDragging = true;
              e.preventDefault();
            });
            
            document.addEventListener('touchmove', function(e) {
              handleMove(e.touches[0].clientX);
            });
            
            document.addEventListener('touchend', function() {
              isDragging = false;
            });
          });
        }
        
        // 事件监听
        prevBtn.addEventListener('click', prevColumn);
        nextBtn.addEventListener('click', nextColumn);
        
        dots.forEach(dot => {
          dot.addEventListener('click', () => {
            goToColumn(parseInt(dot.dataset.index));
          });
        });
        
        // 窗口大小变化时重新初始化
        window.addEventListener('resize', function() {
          initSliders();
          updateSliderLabels();
        });
        
        // 初始化
        initSliders();
        updateCarousel();
      });
    });