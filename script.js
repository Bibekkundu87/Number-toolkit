document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Number to Roman Logic
    // ==========================================
    const numToRomanBtn = document.getElementById('num-roman-btn');
    const numToRomanInput = document.getElementById('num-roman-input');
    const numToRomanResult = document.getElementById('num-roman-result');
    const numToRomanHistory = document.getElementById('num-roman-history');

    numToRomanBtn.addEventListener('click', () => {
        const val = parseInt(numToRomanInput.value);
        
        // Validation
        if (isNaN(val) || val < 1 || val > 3999) {
            showError(numToRomanResult, "Please enter a number between 1 and 3999.");
            return;
        }

        // Conversion Logic
        const roman = convertToRoman(val);
        showSuccess(numToRomanResult, roman);
        addToHistory(numToRomanHistory, `${val} → ${roman}`);
    });

    function convertToRoman(num) {
        const lookup = {
            M: 1000, CM: 900, D: 500, CD: 400,
            C: 100, XC: 90, L: 50, XL: 40,
            X: 10, IX: 9, V: 5, IV: 4, I: 1
        };
        let roman = '';
        for (let i in lookup) {
            while (num >= lookup[i]) {
                roman += i;
                num -= lookup[i];
            }
        }
        return roman;
    }


    // ==========================================
    // 2. Roman to Number Logic
    // ==========================================
    const romanToNumBtn = document.getElementById('roman-num-btn');
    const romanToNumInput = document.getElementById('roman-num-input');
    const romanToNumResult = document.getElementById('roman-num-result');
    const romanToNumHistory = document.getElementById('roman-num-history');

    romanToNumBtn.addEventListener('click', () => {
        let input = romanToNumInput.value.trim().toUpperCase();

        // Basic Validation using Regex
        const validRomanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
        
        if (!input || !validRomanRegex.test(input)) {
            showError(romanToNumResult, "Invalid Roman Numeral.");
            return;
        }

        // Conversion Logic
        const number = convertFromRoman(input);
        showSuccess(romanToNumResult, number);
        addToHistory(romanToNumHistory, `${input} → ${number}`);
    });

    function convertFromRoman(str) {
        const roman = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        let total = 0;
        for (let i = 0; i < str.length; i++) {
            let current = roman[str[i]];
            let next = roman[str[i + 1]];

            if (next && current < next) {
                total -= current;
            } else {
                total += current;
            }
        }
        return total;
    }


    // ==========================================
    // 3. Even / Odd Checker Logic
    // ==========================================
    const evenOddBtn = document.getElementById('even-odd-btn');
    const evenOddInput = document.getElementById('even-odd-input');
    const evenOddResult = document.getElementById('even-odd-result');
    const evenOddHistory = document.getElementById('even-odd-history');

    evenOddBtn.addEventListener('click', () => {
        const val = parseInt(evenOddInput.value);

        if (isNaN(val)) {
            showError(evenOddResult, "Please enter a valid integer.");
            return;
        }

        const isEven = val % 2 === 0;
        const text = isEven ? "Even" : "Odd";
        
        showSuccess(evenOddResult, text);
        addToHistory(evenOddHistory, `${val} is ${text}`);
    });


    // ==========================================
    // 4. Prime Checker Logic
    // ==========================================
    const primeBtn = document.getElementById('prime-btn');
    const primeInput = document.getElementById('prime-input');
    const primeResult = document.getElementById('prime-result');
    const primeHistory = document.getElementById('prime-history');

    primeBtn.addEventListener('click', () => {
        const val = parseInt(primeInput.value);

        if (isNaN(val) || val < 0) {
            showError(primeResult, "Please enter a positive integer.");
            return;
        }

        const resultObj = checkPrime(val);
        const msg = resultObj.isPrime 
            ? "Prime Number" 
            : `Not Prime (Divisible by ${resultObj.divisor})`;

        // Use success color for prime, normal/error for not prime
        if(resultObj.isPrime) {
            showSuccess(primeResult, msg);
        } else {
            // Styling specifically for 'Not Prime' to be distinct but not an 'error'
            primeResult.textContent = msg;
            primeResult.className = 'result-box';
            primeResult.style.color = '#d97706'; // Amber color
            primeResult.style.borderColor = '#fcd34d';
            primeResult.style.backgroundColor = '#fffbeb';
        }
        
        addToHistory(primeHistory, `${val}: ${msg}`);
    });

    function checkPrime(num) {
        if (num <= 1) return { isPrime: false, divisor: "N/A" }; // 0 and 1 are not prime
        if (num <= 3) return { isPrime: true };

        if (num % 2 === 0) return { isPrime: false, divisor: 2 };
        if (num % 3 === 0) return { isPrime: false, divisor: 3 };

        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0) return { isPrime: false, divisor: i };
            if (num % (i + 2) === 0) return { isPrime: false, divisor: i + 2 };
        }
        return { isPrime: true };
    }


    // ==========================================
    // 5. Factorial Calculator Logic
    // ==========================================
    const factBtn = document.getElementById('factorial-btn');
    const factInput = document.getElementById('factorial-input');
    const factResult = document.getElementById('factorial-result');
    const factHistory = document.getElementById('factorial-history');

    factBtn.addEventListener('click', () => {
        const val = parseInt(factInput.value);

        if (isNaN(val) || val < 0) {
            showError(factResult, "Enter a non-negative number.");
            return;
        }
        
        if (val > 20) {
            showError(factResult, "Number too large (Max 20).");
            return;
        }

        const result = calculateFactorial(val);
        showSuccess(factResult, result.toLocaleString()); // Add commas for big numbers
        addToHistory(factHistory, `${val}! = ${result.toLocaleString()}`);
    });

    function calculateFactorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }


    // ==========================================
    // Helper Functions (UI & Utility)
    // ==========================================

    function showError(element, message) {
        element.textContent = message;
        element.className = 'result-box error';
    }

    function showSuccess(element, message) {
        element.textContent = message;
        element.className = 'result-box success';
    }

    function addToHistory(listElement, text) {
        const li = document.createElement('li');
        li.textContent = text;
        
        // Insert at the top
        listElement.prepend(li);

        // Limit to 5 items
        if (listElement.children.length > 5) {
            listElement.removeChild(listElement.lastChild);
        }
    }

    // Optional: Allow "Enter" key to trigger buttons
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                // Find the sibling button and click it
                const btn = this.parentElement.querySelector('button');
                if (btn) btn.click();
            }
        });
    });
});