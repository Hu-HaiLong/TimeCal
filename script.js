document.addEventListener('DOMContentLoaded', function() {
    // 日期计算模式元素
    const dateInput = document.getElementById('dateInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const result = document.getElementById('result');
    const daysEl = document.getElementById('days');
    const weeksEl = document.getElementById('weeks');
    const yearsEl = document.getElementById('years');
    const resultText = document.getElementById('resultText');

    // 天数计算模式元素
    const dateInput2 = document.getElementById('dateInput2');
    const daysInput = document.getElementById('daysInput');
    const calculateDaysBtn = document.getElementById('calculateDaysBtn');
    const daysResult = document.getElementById('daysResult');
    const targetDateEl = document.getElementById('targetDate');
    const weekdayEl = document.getElementById('weekday');
    const daysResultText = document.getElementById('daysResultText');

    // 模式切换元素
    const modeDateBtn = document.getElementById('modeDate');
    const modeDaysBtn = document.getElementById('modeDays');
    const dateMode = document.getElementById('dateMode');
    const daysMode = document.getElementById('daysMode');

    // 初始化日期为今天
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    dateInput.value = todayStr;
    dateInput2.value = todayStr;

    // 追踪是否有计算结果
    let hasDateResult = false;
    let hasDaysResult = false;

    // 模式切换
    modeDateBtn.addEventListener('click', function() {
        modeDateBtn.classList.add('active');
        modeDaysBtn.classList.remove('active');
        dateMode.classList.remove('hidden');
        daysMode.classList.add('hidden');
        // 隐藏天数计算的结果，显示日期计算的结果（如果有）
        daysResult.style.display = 'none';
        if (hasDateResult) {
            result.style.display = '';
        }
    });

    modeDaysBtn.addEventListener('click', function() {
        modeDaysBtn.classList.add('active');
        modeDateBtn.classList.remove('active');
        daysMode.classList.remove('hidden');
        dateMode.classList.add('hidden');
        // 隐藏日期计算的结果，显示天数计算的结果（如果有）
        result.style.display = 'none';
        if (hasDaysResult) {
            daysResult.style.display = '';
        }
    });

    calculateBtn.addEventListener('click', calculate);
    dateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate();
        }
    });

    calculateDaysBtn.addEventListener('click', calculateDays);
    daysInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateDays();
        }
    });

    function calculate() {
        const selectedDate = new Date(dateInput.value);
        const currentDate = new Date();
        
        if (!dateInput.value) {
            alert('请选择一个日期');
            return;
        }

        // 计算时间差（毫秒）
        const timeDiff = currentDate - selectedDate;
        
        // 计算天数
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        // 计算周数
        const weeks = Math.floor(days / 7);
        
        // 计算年数（精确到小数点后2位）
        const years = (days / 365.25).toFixed(2);

        // 显示结果
        daysEl.textContent = Math.abs(days);
        weeksEl.textContent = Math.abs(weeks);
        yearsEl.textContent = Math.abs(years);

        // 生成描述文本
        const dateStr = selectedDate.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        if (days > 0) {
            resultText.textContent = `距离 ${dateStr} 已经过去了 ${Math.abs(days)} 天`;
        } else if (days < 0) {
            resultText.textContent = `${dateStr} 还有 ${Math.abs(days)} 天到来`;
        } else {
            resultText.textContent = `今天就是 ${dateStr}`;
        }

        // 显示结果区域
        result.style.display = '';
        hasDateResult = true;
    }

    function calculateDays() {
        const selectedDate = new Date(dateInput2.value);
        const days = parseInt(daysInput.value);
        
        if (!dateInput2.value) {
            alert('请选择起始日期');
            return;
        }
        
        if (!daysInput.value || isNaN(days)) {
            alert('请输入有效的天数');
            return;
        }

        // 计算目标日期
        const targetDate = new Date(selectedDate);
        targetDate.setDate(selectedDate.getDate() + days);

        // 获取星期几
        const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const weekday = weekdays[targetDate.getDay()];

        // 格式化日期
        const startDateStr = selectedDate.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const dateStr = targetDate.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const dateStrShort = targetDate.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        // 显示结果
        targetDateEl.textContent = dateStrShort;
        weekdayEl.textContent = weekday;

        if (days > 0) {
            daysResultText.textContent = `从 ${startDateStr} 开始，${days} 天后是 ${dateStr}（${weekday}）`;
        } else if (days < 0) {
            daysResultText.textContent = `从 ${startDateStr} 开始，${Math.abs(days)} 天前是 ${dateStr}（${weekday}）`;
        } else {
            daysResultText.textContent = `就是 ${dateStr}（${weekday}）`;
        }

        // 显示结果区域
        daysResult.style.display = '';
        hasDaysResult = true;
    }
});
