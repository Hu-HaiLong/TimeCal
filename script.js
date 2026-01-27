document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('dateInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const result = document.getElementById('result');
    const daysEl = document.getElementById('days');
    const weeksEl = document.getElementById('weeks');
    const yearsEl = document.getElementById('years');
    const resultText = document.getElementById('resultText');

    // 从 localStorage 读取上次保存的日期
    const savedDate = localStorage.getItem('savedDate');
    if (savedDate) {
        dateInput.value = savedDate;
        calculate(); // 自动计算并显示结果
    } else {
        // 如果没有保存的日期，设置默认日期为今天
        const today = new Date();
        dateInput.valueAsDate = today;
    }

    calculateBtn.addEventListener('click', calculate);
    dateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate();
        }
    });

    function calculate() {
        const selectedDate = new Date(dateInput.value);
        const currentDate = new Date();
        
        if (!dateInput.value) {
            alert('请选择一个日期');
            return;
        }

        // 保存日期到 localStorage
        localStorage.setItem('savedDate', dateInput.value);

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
        result.classList.remove('hidden');
    }
});
