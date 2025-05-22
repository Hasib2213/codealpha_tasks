 const form = document.getElementById('ageForm');
    const birthDateInput = document.getElementById('birthDate');
    const resultContainer = document.getElementById('resultContainer');
    const ageDisplay = document.getElementById('ageDisplay');
    const yearsSpan = document.getElementById('years');
    const monthsSpan = document.getElementById('months');
    const daysSpan = document.getElementById('days');
    const errorMessage = document.getElementById('errorMessage');

    const today = new Date();
    birthDateInput.max = today.toISOString().split('T')[0];

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      calculateAge();
    });

    function calculateAge() {
      const birthDateValue = birthDateInput.value;

      if (!birthDateValue) {
        showError('Please enter your date of birth.');
        return;
      }

      const birthDate = new Date(birthDateValue);
      const currentDate = new Date();

      if (birthDate > currentDate) {
        showError('Birth date cannot be in the future.');
        return;
      }

      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 150);
      if (birthDate < minDate) {
        showError('Please enter a valid birth date.');
        return;
      }

      hideError();

      const ageResult = calculatePreciseAge(birthDate, currentDate);
      displayAge(ageResult);
    }

    function calculatePreciseAge(birthDate, currentDate) {
      let years = currentDate.getFullYear() - birthDate.getFullYear();
      let months = currentDate.getMonth() - birthDate.getMonth();
      let days = currentDate.getDate() - birthDate.getDate();

      if (days < 0) {
        months--;
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += lastMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      const oneDay = 24 * 60 * 60 * 1000;
      const totalDays = Math.floor((currentDate - birthDate) / oneDay);

      return { years, months, days, totalDays };
    }

    function displayAge(ageResult) {
      yearsSpan.textContent = ageResult.years;
      monthsSpan.textContent = ageResult.months;
      daysSpan.textContent = ageResult.days;

      let ageText = '';
      if (ageResult.years > 0) ageText += `${ageResult.years} year${ageResult.years !== 1 ? 's' : ''}`;
      if (ageResult.months > 0) ageText += `${ageText ? ', ' : ''}${ageResult.months} month${ageResult.months !== 1 ? 's' : ''}`;
      if (ageResult.days > 0) ageText += `${ageText ? ', and ' : ''}${ageResult.days} day${ageResult.days !== 1 ? 's' : ''}`;

      ageDisplay.innerHTML = `
        <strong>You are ${ageText} old!</strong><br>
        
      `;

      resultContainer.classList.add('show');
    }

    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.classList.add('show');
      resultContainer.classList.remove('show');
    }

    function hideError() {
      errorMessage.classList.remove('show');
    }