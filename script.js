
    
      // if (window.location.href === "https://sumitgarg100000.github.io/IncometaxCalculator/") {
      // Get the heading element
      //       var heading = document.querySelector("h2");
      // Check if the heading text content is equal to "abc"
      //if(heading.textContent.trim() === "(Disclaimer- This Calculator is made after incorporating all the relevant provisions of income tax act applicable for FY 2024-25(AY 2025-26). If any query, Contact - Sumit Garg, Ph. No. - 9716804520, Email - SumitGarg100000@Gmail.com)")
      // {

      // import json coding suru
      // Data ko localStorage mein save karna
function saveToLocalStorage() {
  const inputs = document.querySelectorAll('input, select');
  const data = {};

  inputs.forEach(input => {
    data[input.id] = input.value;
  });
  
  localStorage.setItem('taxCalculatorData', JSON.stringify(data));

  // Event listeners for real-time updates
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      data[input.id] = input.value;
      localStorage.setItem('taxCalculatorData', JSON.stringify(data));
    });

    input.addEventListener('change', function() {
      data[input.id] = input.value;
      localStorage.setItem('taxCalculatorData', JSON.stringify(data));
    });
  });
}

// LocalStorage se data load karna aur inputs mein set karna
function loadFromLocalStorage() {
  const savedData = localStorage.getItem('taxCalculatorData');
  if (savedData) {
    const data = JSON.parse(savedData);
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
      if (data[input.id]) {
        input.value = data[input.id];
      }
    });
  }
}

// Page refresh ya close hone se pehle data save karna
window.addEventListener('beforeunload', function() {
  const inputs = document.querySelectorAll('input, select');
  const data = {};
  inputs.forEach(input => {
    data[input.id] = input.value;
  });
  localStorage.setItem('taxCalculatorData', JSON.stringify(data));
});

// Page load hone pe saved data ko load karna
document.addEventListener('DOMContentLoaded', function() {
  loadFromLocalStorage(); // Pehle saved data load karo
  saveToLocalStorage();   // Phir event listeners set karo
});

      function exportToJSON() {
        const inputs = document.querySelectorAll('input, select');
        const data = {};
        inputs.forEach(input => {
          data[input.id] = input.value;
        });
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tax_calculator_data.json';
        a.click();
        URL.revokeObjectURL(url);
      }

      function importFromJSON(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const data = JSON.parse(e.target.result);
      for (const [id, value] of Object.entries(data)) {
        const element = document.getElementById(id);
        if (element) {
          element.value = value;
          // Trigger input event to simulate user input
          element.dispatchEvent(new Event('input'));
        }
      }
      // Optional: Explicitly call CalculateAllIncome after all updates
      setTimeout(() => {
        CalculateAllIncome();
        saveToLocalStorage(); // Save to local storage after import
      }, 0); // Zero delay to ensure DOM updates are complete
    };
    reader.readAsText(file);
  }
}

// import json coding end
      document.addEventListener("DOMContentLoaded", function() {
   
        // calculate all income function run
        function CalculateAllIncome() {
          // Income from Salary   
          let oldbasicsalary = Math.max(0, Number(document.getElementById('basicsalary').value));
          let oldhra = Math.max(0, Number(document.getElementById('hra').value));
          let oldbonus = Math.max(0, Number(document.getElementById('bonus').value));
          let oldspecialallowance = Math.max(0, Number(document.getElementById('specialallowance').value));
          let oldotherallowance = Math.max(0, Number(document.getElementById('otherallowance').value));
          let oldgrosssalary = oldbasicsalary + oldhra + oldbonus + oldspecialallowance + oldotherallowance;
          let oldexemptionsec13a = Math.min(Math.max(0, Number(document.getElementById('exemptionsec13a').value)), oldgrosssalary);
          let oldotherexemption = Math.min(Math.max(0, Number(document.getElementById('otherexemption').value)), oldgrosssalary - oldexemptionsec13a);
          let oldprofessionaltax = Math.min(Math.max(0, Number(document.getElementById('professionaltax').value)), oldgrosssalary - oldexemptionsec13a - oldotherexemption);
          let oldstandarddeduction = Math.min((oldgrosssalary - (oldexemptionsec13a + oldotherexemption + oldprofessionaltax)), 50000);
          let oldnetsalary = oldgrosssalary - (oldexemptionsec13a + oldotherexemption + oldprofessionaltax + oldstandarddeduction);
          let newbasicsalary = Math.max(0, Number(document.getElementById('basicsalary').value));
          let newhra = Math.max(0, Number(document.getElementById('hra').value));
          let newbonus = Math.max(0, Number(document.getElementById('bonus').value));
          let newspecialallowance = Math.max(0, Number(document.getElementById('specialallowance').value));
          let newotherallowance = Math.max(0, Number(document.getElementById('otherallowance').value));
          let newgrosssalary = newbasicsalary + newhra + newbonus + newspecialallowance + newotherallowance;
          let newexemptionsec13a = 0;
          let newotherexemption = 0;
          let newprofessionaltax = 0;
          let newstandarddeduction = Math.min((newgrosssalary - (newexemptionsec13a + newotherexemption + newprofessionaltax)), 75000);
          let newnetsalary = newgrosssalary - (newexemptionsec13a + newotherexemption + newprofessionaltax + newstandarddeduction);
          document.getElementById('oldregimebasicsalary').textContent = oldbasicsalary.toFixed(2);
          document.getElementById('oldregimehra').textContent = oldhra.toFixed(2);
          document.getElementById('oldregimebonus').textContent = oldbonus.toFixed(2);
          document.getElementById('oldregimespecialallowance').textContent = oldspecialallowance.toFixed(2);
          document.getElementById('oldregimeotherallowance').textContent = oldotherallowance.toFixed(2);
          document.getElementById('oldregimegrosssalary').textContent = oldgrosssalary.toFixed(2);
          document.getElementById('oldregimeexemptionsec13a').textContent = oldexemptionsec13a.toFixed(2);
          document.getElementById('oldregimeotherexemption').textContent = oldotherexemption.toFixed(2);
          document.getElementById('oldregimeprofessionaltax').textContent = oldprofessionaltax.toFixed(2);
          document.getElementById('oldregimestandarddeduction').textContent = oldstandarddeduction.toFixed(2);
          document.getElementById('oldregimenetsalary').textContent = oldnetsalary.toFixed(2);
          document.getElementById('newregimebasicsalary').textContent = newbasicsalary.toFixed(2);
          document.getElementById('newregimehra').textContent = newhra.toFixed(2);
          document.getElementById('newregimebonus').textContent = newbonus.toFixed(2);
          document.getElementById('newregimespecialallowance').textContent = newspecialallowance.toFixed(2);
          document.getElementById('newregimeotherallowance').textContent = newotherallowance.toFixed(2);
          document.getElementById('newregimegrosssalary').textContent = newgrosssalary.toFixed(2);
          document.getElementById('newregimeexemptionsec13a').textContent = newexemptionsec13a.toFixed(2);
          document.getElementById('newregimeotherexemption').textContent = newotherexemption.toFixed(2);
          document.getElementById('newregimeprofessionaltax').textContent = newprofessionaltax.toFixed(2);
          document.getElementById('newregimestandarddeduction').textContent = newstandarddeduction.toFixed(2);
          document.getElementById('newregimenetsalary').textContent = newnetsalary.toFixed(2);
          // Income from House Property
          let oldgrossannualvalue = Math.max(0, Number(document.getElementById('grossannualvalue').value));
          let oldmunicipaltaxes = Math.min(Math.max(0, Number(document.getElementById('municipaltaxes').value)), oldgrossannualvalue);
          let oldnav = oldgrossannualvalue - oldmunicipaltaxes;
          let oldstandarddeductionhp = oldnav * 0.3;
          let oldinterestletout = Math.min(Math.max(0, Number(document.getElementById('interestletout').value)), oldnav * 0.7 + 200000);
          let oldinterestselfoccupied = Math.min(Math.max(0, Number(document.getElementById('interestselfoccupied').value)), 200000);
          let newgrossannualvalue = Math.max(0, Number(document.getElementById('grossannualvalue').value));
          let newmunicipaltaxes = Math.min(Math.max(0, Number(document.getElementById('municipaltaxes').value)), newgrossannualvalue);
          let newnav = newgrossannualvalue - newmunicipaltaxes;
          let newstandarddeductionhp = newnav * 0.3;
          let newinterestletout = Math.min(Math.max(0, Number(document.getElementById('interestletout').value)), newnav * 0.7);
          let newinterestselfoccupied = 0;
          let newnetincomehp = Math.max((newnav - newstandarddeductionhp) - newinterestletout - newinterestselfoccupied, 0);
          //Interest on Self-Occupied - Allowed upto 2Lakh in Old Scheme but not Allowed in New Scheme
          //Interest on LetOut    - No Limit in Old & New Scheme from NAV Income
          //Loss on Interest on LetOut    - Interhead Setoff Allowed in Old Scheme upto 2Lakh from other head of Income but not allowed in new scheme
          //Old net income logic - Can be Nagative only upto 200000 for interhead setoff from the Interest on Self-Occupied & Letout both
          //Net net income logic - Can not be Nagative Beacuse no interhead setoff allowed. So, Min Value will be Zero
          document.getElementById('oldregimegrossannualvalue').textContent = oldgrossannualvalue.toFixed(2);
          document.getElementById('oldregimemunicipaltaxes').textContent = oldmunicipaltaxes.toFixed(2);
          document.getElementById('oldregimenav').textContent = oldnav.toFixed(2);
          document.getElementById('oldregimestandarddeductionhp').textContent = oldstandarddeductionhp.toFixed(2);
          document.getElementById('oldregimeinterestletout').textContent = oldinterestletout.toFixed(2);
          document.getElementById('oldregimeinterestselfoccupied').textContent = oldinterestselfoccupied.toFixed(2);
          document.getElementById('newregimegrossannualvalue').textContent = newgrossannualvalue.toFixed(2);
          document.getElementById('newregimemunicipaltaxes').textContent = newmunicipaltaxes.toFixed(2);
          document.getElementById('newregimenav').textContent = newnav.toFixed(2);
          document.getElementById('newregimestandarddeductionhp').textContent = newstandarddeductionhp.toFixed(2);
          document.getElementById('newregimeinterestletout').textContent = newinterestletout.toFixed(2);
          document.getElementById('newregimeinterestselfoccupied').textContent = newinterestselfoccupied.toFixed(2);
          document.getElementById('newregimenetincomehp').textContent = newnetincomehp.toFixed(2);
          // Income from PGBP
          // Retrieve values from input fields
          let oldgrossturnover = Math.max(Number(document.getElementById('grossturnover').value), 0);
          let oldpercentprofit = Math.max(Number(document.getElementById('percentprofit').value), 6);
          let oldnormalbusinessincome = Number(document.getElementById('normalbusinessincome').value);
          let newgrossturnover = Math.max(Number(document.getElementById('grossturnover').value), 0);
          let newpercentprofit = Math.max(Number(document.getElementById('percentprofit').value), 6);
          let newnormalbusinessincome = Number(document.getElementById('normalbusinessincome').value);
          // Calculate net profit u/s 44AD and 44ADA
          let oldnetprofit44ad = oldgrossturnover * (oldpercentprofit / 100);
          let oldnetincomepgbp = 0;
          let newnetprofit44ad = newgrossturnover * (newpercentprofit / 100);
          let newnetincomepgbp = 0;
          // Update corresponding table cells in the old tax regime & new tax regime
          document.getElementById('oldregimegrossturnover').textContent = oldgrossturnover.toFixed(2);
          document.getElementById('oldregimepercentprofit').textContent = oldpercentprofit.toFixed(2);
          document.getElementById('oldregimenetprofit44ad').textContent = oldnetprofit44ad.toFixed(2);
          document.getElementById('oldregimenormalbusinessincome').textContent = oldnormalbusinessincome.toFixed(2);
          document.getElementById('newregimegrossturnover').textContent = newgrossturnover.toFixed(2);
          document.getElementById('newregimepercentprofit').textContent = newpercentprofit.toFixed(2);
          document.getElementById('newregimenetprofit44ad').textContent = newnetprofit44ad.toFixed(2);
          document.getElementById('newregimenormalbusinessincome').textContent = newnormalbusinessincome.toFixed(2);
          //Income from Capital Gain before 23.07.2024
          // Retrieve values from the input fields
          let oldstcgsec111_plus = Math.max(Number(document.getElementById('stcgsec111').value), 0);
          let oldstcgsec111a_plus = Math.max(Number(document.getElementById('stcgsec111a').value), 0);
          let oldltcgsec112_plus = Math.max(Number(document.getElementById('ltcgsec112').value), 0);
          let oldltcgsec112a_plus = Math.max(Number(document.getElementById('ltcgsec112a').value), 0);
          let newstcgsec111_plus = Math.max(Number(document.getElementById('stcgsec111').value), 0);
          let newstcgsec111a_plus = Math.max(Number(document.getElementById('stcgsec111a').value), 0);
          let newltcgsec112_plus = Math.max(Number(document.getElementById('ltcgsec112').value), 0);
          let newltcgsec112a_plus = Math.max(Number(document.getElementById('ltcgsec112a').value), 0);
          let oldstcgsec111_minus = Math.min(Number(document.getElementById('stcgsec111').value), 0);
          let oldstcgsec111a_minus = Math.min(Number(document.getElementById('stcgsec111a').value), 0);
          let oldltcgsec112_minus = Math.min(Number(document.getElementById('ltcgsec112').value), 0);
          let oldltcgsec112a_minus = Math.min(Number(document.getElementById('ltcgsec112a').value), 0);
          let newstcgsec111_minus = Math.min(Number(document.getElementById('stcgsec111').value), 0);
          let newstcgsec111a_minus = Math.min(Number(document.getElementById('stcgsec111a').value), 0);
          let newltcgsec112_minus = Math.min(Number(document.getElementById('ltcgsec112').value), 0);
          let newltcgsec112a_minus = Math.min(Number(document.getElementById('ltcgsec112a').value), 0);
          let oldstcgsec111 = oldstcgsec111_plus + oldstcgsec111_minus;
          let oldstcgsec111a = oldstcgsec111a_plus + oldstcgsec111a_minus;
          let oldltcgsec112 = oldltcgsec112_plus + oldltcgsec112_minus;
          let oldltcgsec112a = oldltcgsec112a_plus + oldltcgsec112a_minus;
          let newstcgsec111 = newstcgsec111_plus + newstcgsec111_minus;
          let newstcgsec111a = newstcgsec111a_plus + newstcgsec111a_minus;
          let newltcgsec112 = newltcgsec112_plus + newltcgsec112_minus;
          let newltcgsec112a = newltcgsec112a_plus + newltcgsec112a_minus;
          // Update the corresponding table cells with the calculated values
          document.getElementById('oldregimestcgsec111').textContent = oldstcgsec111.toFixed(2);
          document.getElementById('oldregimestcgsec111a').textContent = oldstcgsec111a.toFixed(2);
          document.getElementById('oldregimeltcgsec112').textContent = oldltcgsec112.toFixed(2);
          document.getElementById('oldregimeltcgsec112a').textContent = oldltcgsec112a.toFixed(2);
          document.getElementById('newregimestcgsec111').textContent = newstcgsec111.toFixed(2);
          document.getElementById('newregimestcgsec111a').textContent = newstcgsec111a.toFixed(2);
          document.getElementById('newregimeltcgsec112').textContent = newltcgsec112.toFixed(2);
          document.getElementById('newregimeltcgsec112a').textContent = newltcgsec112a.toFixed(2);
          // Income from capital Gain on or after 23.07.2024
          // Retrieve values from the input fields
          let oldstcgsec111_plus_jul = Math.max(Number(document.getElementById('stcgsec111_jul').value), 0);
          let oldstcgsec111a_plus_jul = Math.max(Number(document.getElementById('stcgsec111a_jul').value), 0);
          let oldltcgsec112_plus_jul = Math.max(Number(document.getElementById('ltcgsec112_jul').value), 0);
          let oldltcgsec112a_plus_jul = Math.max(Number(document.getElementById('ltcgsec112a_jul').value), 0);
          let newstcgsec111_plus_jul = Math.max(Number(document.getElementById('stcgsec111_jul').value), 0);
          let newstcgsec111a_plus_jul = Math.max(Number(document.getElementById('stcgsec111a_jul').value), 0);
          let newltcgsec112_plus_jul = Math.max(Number(document.getElementById('ltcgsec112_jul').value), 0);
          let newltcgsec112a_plus_jul = Math.max(Number(document.getElementById('ltcgsec112a_jul').value), 0);
          let oldstcgsec111_minus_jul = Math.min(Number(document.getElementById('stcgsec111_jul').value), 0);
          let oldstcgsec111a_minus_jul = Math.min(Number(document.getElementById('stcgsec111a_jul').value), 0);
          let oldltcgsec112_minus_jul = Math.min(Number(document.getElementById('ltcgsec112_jul').value), 0);
          let oldltcgsec112a_minus_jul = Math.min(Number(document.getElementById('ltcgsec112a_jul').value), 0);
          let newstcgsec111_minus_jul = Math.min(Number(document.getElementById('stcgsec111_jul').value), 0);
          let newstcgsec111a_minus_jul = Math.min(Number(document.getElementById('stcgsec111a_jul').value), 0);
          let newltcgsec112_minus_jul = Math.min(Number(document.getElementById('ltcgsec112_jul').value), 0);
          let newltcgsec112a_minus_jul = Math.min(Number(document.getElementById('ltcgsec112a_jul').value), 0);
          let oldstcgsec111_jul = oldstcgsec111_plus_jul + oldstcgsec111_minus_jul;
          let oldstcgsec111a_jul = oldstcgsec111a_plus_jul + oldstcgsec111a_minus_jul;
          let oldltcgsec112_jul = oldltcgsec112_plus_jul + oldltcgsec112_minus_jul;
          let oldltcgsec112a_jul = oldltcgsec112a_plus_jul + oldltcgsec112a_minus_jul;
          let newstcgsec111_jul = newstcgsec111_plus_jul + newstcgsec111_minus_jul;
          let newstcgsec111a_jul = newstcgsec111a_plus_jul + newstcgsec111a_minus_jul;
          let newltcgsec112_jul = newltcgsec112_plus_jul + newltcgsec112_minus_jul;
          let newltcgsec112a_jul = newltcgsec112a_plus_jul + newltcgsec112a_minus_jul;
          //Capital Gain Loss cannot be setoff from any other head. It means Net capital gain can't be go negative
          let oldnetcapitalgain = Math.max(oldstcgsec111 + oldstcgsec111a + oldltcgsec112 + oldltcgsec112a + oldstcgsec111_jul + oldstcgsec111a_jul + oldltcgsec112_jul + oldltcgsec112a_jul, 0);
          let newnetcapitalgain = Math.max(newstcgsec111 + newstcgsec111a + newltcgsec112 + newltcgsec112a + newstcgsec111_jul + newstcgsec111a_jul + newltcgsec112_jul + newltcgsec112a_jul, 0);
          // Update the corresponding table cells with the calculated values
          document.getElementById('oldregimestcgsec111_jul').textContent = oldstcgsec111_jul.toFixed(2);
          document.getElementById('oldregimestcgsec111a_jul').textContent = oldstcgsec111a_jul.toFixed(2);
          document.getElementById('oldregimeltcgsec112_jul').textContent = oldltcgsec112_jul.toFixed(2);
          document.getElementById('oldregimeltcgsec112a_jul').textContent = oldltcgsec112a_jul.toFixed(2);
          document.getElementById('oldregimenetcapitalgain').textContent = oldnetcapitalgain.toFixed(2);
          document.getElementById('newregimestcgsec111_jul').textContent = newstcgsec111_jul.toFixed(2);
          document.getElementById('newregimestcgsec111a_jul').textContent = newstcgsec111a_jul.toFixed(2);
          document.getElementById('newregimeltcgsec112_jul').textContent = newltcgsec112_jul.toFixed(2);
          document.getElementById('newregimeltcgsec112a_jul').textContent = newltcgsec112a_jul.toFixed(2);
          document.getElementById('newregimenetcapitalgain').textContent = newnetcapitalgain.toFixed(2);
          //Income from Other Sources
          // Retrieve values from input fields
          let olddividendincome = Math.max(0, Number(document.getElementById('dividendincome').value));
          let oldinterestsavingbank = Math.max(0, Number(document.getElementById('interestsavingbank').value));
          let oldinterestfd = Math.max(0, Number(document.getElementById('interestfd').value));
          let oldwinninglottery = Math.max(0, Number(document.getElementById('winninglottery').value));
          let oldotherincome = Math.max(0, Number(document.getElementById('otherincome').value));
          let newdividendincome = Math.max(0, Number(document.getElementById('dividendincome').value));
          let newinterestsavingbank = Math.max(0, Number(document.getElementById('interestsavingbank').value));
          let newinterestfd = Math.max(0, Number(document.getElementById('interestfd').value));
          let newwinninglottery = Math.max(0, Number(document.getElementById('winninglottery').value));
          let newotherincome = Math.max(0, Number(document.getElementById('otherincome').value));
          let oldnetothersources = olddividendincome + oldinterestsavingbank + oldinterestfd + oldwinninglottery + oldotherincome;
          document.getElementById('oldregimenetothersources').textContent = oldnetothersources.toFixed(2);
          let newnetothersources = newdividendincome + newinterestsavingbank + newinterestfd + newwinninglottery + newotherincome;
          document.getElementById('newregimenetothersources').textContent = newnetothersources.toFixed(2);
          // Update values in Old Tax Regime & New Tax Regime
          document.getElementById('oldregimedividendincome').textContent = olddividendincome.toFixed(2);
          document.getElementById('oldregimeinterestsavingbank').textContent = oldinterestsavingbank.toFixed(2);
          document.getElementById('oldregimeinterestfd').textContent = oldinterestfd.toFixed(2);
          document.getElementById('oldregimewinninglottery').textContent = oldwinninglottery.toFixed(2);
          document.getElementById('oldregimeotherincome').textContent = oldotherincome.toFixed(2);
          document.getElementById('newregimedividendincome').textContent = newdividendincome.toFixed(2);
          document.getElementById('newregimeinterestsavingbank').textContent = newinterestsavingbank.toFixed(2);
          document.getElementById('newregimeinterestfd').textContent = newinterestfd.toFixed(2);
          document.getElementById('newregimewinninglottery').textContent = newwinninglottery.toFixed(2);
          document.getElementById('newregimeotherincome').textContent = newotherincome.toFixed(2);
          //Income from Virtual Digital Asset
          // Retrieve values from input fields
          let oldvda = Math.max(0, Number(document.getElementById('vda').value));
          let newvda = Math.max(0, Number(document.getElementById('vda').value));
          document.getElementById('oldregimevda').textContent = oldvda.toFixed(2);
          document.getElementById('oldregimenetvda').textContent = oldvda.toFixed(2);
          document.getElementById('newregimevda').textContent = newvda.toFixed(2);
          document.getElementById('newregimenetvda').textContent = newvda.toFixed(2);
          //In old Regime HP loss will be setoff from all income & PGBP Loss will be setoff from all income except Salary
          let oldnetincomehp = 0;
          if ((oldnetprofit44ad + oldnormalbusinessincome) >= 0 && Math.max(oldnav - oldstandarddeductionhp - oldinterestletout - oldinterestselfoccupied, -200000) >= 0) {
            oldnetincomepgbp = oldnetprofit44ad + oldnormalbusinessincome;
            oldnetincomehp = Math.max(oldnav - oldstandarddeductionhp - oldinterestletout - oldinterestselfoccupied, -200000);
          } else if (oldnormalbusinessincome < 0 && Math.max(oldnav - oldstandarddeductionhp - oldinterestletout - oldinterestselfoccupied, -200000) >= 0) {
            oldnetincomepgbp = Math.max((oldnetprofit44ad + oldnormalbusinessincome), -(Math.max(oldnav - oldstandarddeductionhp - oldinterestletout - oldinterestselfoccupied, -200000) + oldnetprofit44ad + oldnetcapitalgain + oldnetothersources));
            oldnetincomehp = Math.max(oldnav - oldstandarddeductionhp - oldinterestletout - oldinterestselfoccupied, -200000);
          } else if (oldnormalbusinessincome >= 0 && Math.max(oldnav - oldstandarddeductionhp - oldinterestletout - oldinterestselfoccupied, -200000) < 0) {
            oldnetincomepgbp = oldnetprofit44ad + oldnormalbusinessincome;
            oldnetincomehp = Math.max(Math.max((oldnav - oldstandarddeductionhp) - oldinterestletout - oldinterestselfoccupied, -200000), -(oldnetsalary + oldnetprofit44ad + oldnormalbusinessincome + oldnetcapitalgain + oldnetothersources));
          } else {
            oldnetincomepgbp = Math.max((oldnetprofit44ad + oldnormalbusinessincome), -(oldnetprofit44ad + oldnetcapitalgain + oldnetothersources));
            oldnetincomehp = Math.max(Math.max((oldnav - oldstandarddeductionhp) - oldinterestletout - oldinterestselfoccupied, -200000), -(oldnetsalary + oldnetincomepgbp + oldnetcapitalgain + oldnetothersources));
          }
          //In New Regime HP loss will not be setoff from any income & PGBP Loss will be setoff from all income except Salary
          newnetincomepgbp = Math.max((newnetprofit44ad + newnormalbusinessincome), -(newnetprofit44ad + newnetcapitalgain + newnetothersources));
          // Loss Carry Forward Calculation
          let oldinterheadhpcarry = -((oldnav - oldstandarddeductionhp - Math.max(0, Number(document.getElementById('interestletout').value)) - Math.max(0, Number(document.getElementById('interestselfoccupied').value))) - oldnetincomehp);
          let newinterheadhpcarry = -((newnav - newstandarddeductionhp - Math.max(0, Number(document.getElementById('interestletout').value)) - Math.max(0, Number(document.getElementById('interestselfoccupied').value))) - newnetincomehp);
          let oldinterheadpgbpcarry = oldnetprofit44ad + Number(document.getElementById('normalbusinessincome').value) - oldnetincomepgbp;
          let newinterheadpgbpcarry = newnetprofit44ad + Number(document.getElementById('normalbusinessincome').value) - newnetincomepgbp;
          let oldinterheadltcgcarry = -Math.min((oldltcgsec112 + oldltcgsec112a + oldltcgsec112_jul + oldltcgsec112a_jul), 0);
          let newinterheadltcgcarry = -Math.min((newltcgsec112 + newltcgsec112a + newltcgsec112_jul + newltcgsec112a_jul), 0);
          let oldinterheadstcgcarry = -Math.min((Math.min(oldstcgsec111 + oldstcgsec111a + oldstcgsec111_jul + oldstcgsec111a_jul, 0) + Math.max(oldltcgsec112 + oldltcgsec112a + oldltcgsec112_jul + oldltcgsec112a_jul, 0)), 0);
          let newinterheadstcgcarry = -Math.min((Math.min(newstcgsec111 + newstcgsec111a + newstcgsec111_jul + newstcgsec111a_jul, 0) + Math.max(newltcgsec112 + newltcgsec112a + newltcgsec112_jul + newltcgsec112a_jul, 0)), 0);
          document.getElementById('oldregimehploss').textContent = oldinterheadhpcarry.toFixed(2);
          document.getElementById('oldregimepgbploss').textContent = oldinterheadpgbpcarry.toFixed(2);
          document.getElementById('oldregimestcgloss').textContent = oldinterheadstcgcarry.toFixed(2);
          document.getElementById('oldregimeltcgloss').textContent = oldinterheadltcgcarry.toFixed(2);
          document.getElementById('newregimehploss').textContent = newinterheadhpcarry.toFixed(2);
          document.getElementById('newregimepgbploss').textContent = newinterheadpgbpcarry.toFixed(2);
          document.getElementById('newregimestcgloss').textContent = newinterheadstcgcarry.toFixed(2);
          document.getElementById('newregimeltcgloss').textContent = newinterheadltcgcarry.toFixed(2);
          // Calculate Gross Total Income
          let oldgrosstotalincome = Math.max(oldnetsalary + oldnetincomehp + oldnetincomepgbp + oldnetcapitalgain + oldnetothersources + oldvda, 0);
          let newgrosstotalincome = Math.max(newnetsalary + newnetincomehp + newnetincomepgbp + newnetcapitalgain + newnetothersources + newvda, 0);
          document.getElementById('oldregimenetincomehp').textContent = oldnetincomehp.toFixed(2);
          document.getElementById('oldregimenetincomepgbp').textContent = oldnetincomepgbp.toFixed(2);
          document.getElementById('newregimenetincomepgbp').textContent = newnetincomepgbp.toFixed(2);
          document.getElementById('oldregimegrosstotalincome').textContent = oldgrosstotalincome.toFixed(2);
          document.getElementById('newregimegrosstotalincome').textContent = newgrosstotalincome.toFixed(2);
          //Deductions
          // Get user input for deductions
          // Retrieve values from the input fields and ensure each deduction does not exceed a certain value
          let olddeduction80c = Math.min(150000, Number(document.getElementById('deduction80c').value));
          let olddeduction80ccc = Math.min(150000, Number(document.getElementById('deduction80ccc').value)); // Adjust 'maximumValue' accordingly
          let olddeduction80ccd1 = Math.min(150000, Number(document.getElementById('deduction80ccd1').value)); // Adjust 'maximumValue' accordingly
          let oldrestrictdeduction = Math.min(150000, olddeduction80c + olddeduction80ccc + olddeduction80ccd1);
          let olddeduction80ccd1b = Math.min(50000, Number(document.getElementById('deduction80ccd1b').value)); // Adjust 'maximumValue' accordingly
          let olddeduction80ccd2 = Math.max(Number(document.getElementById('deduction80ccd2').value), 0);
          let olddeduction80d = Math.min(100000, Number(document.getElementById('deduction80d').value)); // Adjust 'maximumValue' accordingly
          let olddeduction80g = Math.max(Number(document.getElementById('deduction80g').value), 0);
          let olddeduction80e = Math.max(Number(document.getElementById('deduction80e').value), 0); // Adjust 'maximumValue' accordingly
          let olddeduction80ee = Math.max(Number(document.getElementById('deduction80ee').value), 0); // Adjust 'maximumValue' accordingly
          let olddeduction80tta = Math.min(10000, Number(document.getElementById('deduction80tta').value)); // Adjust 'maximumValue' accordingly
          let olddeduction80ttb = Math.min(50000, Number(document.getElementById('deduction80ttb').value)); // Adjust 'maximumValue' accordingly
          let oldanyotherdeduction = Math.max(Number(document.getElementById('anyotherdeduction').value), 0); // Adjust 'maximumValue' accordingly
          let oldtotaldeduction = oldrestrictdeduction + olddeduction80ccd1b + olddeduction80ccd2 + olddeduction80d + olddeduction80g + olddeduction80e + olddeduction80ee + olddeduction80tta + olddeduction80ttb + oldanyotherdeduction;
          let oldeligiblededuction = Math.min(Math.max(oldgrosstotalincome - (oldstcgsec111a + oldltcgsec112 + oldltcgsec112a + oldstcgsec111a_jul + oldltcgsec112_jul + oldltcgsec112a_jul + oldwinninglottery + oldvda), 0), oldtotaldeduction);
          let oldnetincome = Math.max(oldgrosstotalincome - oldeligiblededuction, 0);
          // Update the corresponding table cells with the calculated values for the old tax regime
          document.getElementById('oldregimededuction80c').textContent = olddeduction80c.toFixed(2);
          document.getElementById('oldregimededuction80ccc').textContent = olddeduction80ccc.toFixed(2);
          document.getElementById('oldregimededuction80ccd1').textContent = olddeduction80ccd1.toFixed(2);
          document.getElementById('oldregimerestrictdeduction').textContent = oldrestrictdeduction.toFixed(2);
          document.getElementById('oldregimededuction80ccd1b').textContent = olddeduction80ccd1b.toFixed(2);
          document.getElementById('oldregimededuction80ccd2').textContent = olddeduction80ccd2.toFixed(2);
          document.getElementById('oldregimededuction80d').textContent = olddeduction80d.toFixed(2);
          document.getElementById('oldregimededuction80g').textContent = olddeduction80g.toFixed(2);
          document.getElementById('oldregimededuction80e').textContent = olddeduction80e.toFixed(2);
          document.getElementById('oldregimededuction80ee').textContent = olddeduction80ee.toFixed(2);
          document.getElementById('oldregimededuction80tta').textContent = olddeduction80tta.toFixed(2);
          document.getElementById('oldregimededuction80ttb').textContent = olddeduction80ttb.toFixed(2);
          document.getElementById('oldregimeanyotherdeduction').textContent = oldanyotherdeduction.toFixed(2);
          document.getElementById('oldregimetotaldeduction').textContent = oldtotaldeduction.toFixed(2);
          document.getElementById('oldregimeeligiblededuction').textContent = oldeligiblededuction.toFixed(2);
          document.getElementById('oldregimenetincome').textContent = oldnetincome.toFixed(2);
          document.getElementById('newregimededuction80ccd2').textContent = olddeduction80ccd2.toFixed(2);
          // Retrieve values from the input fields and ensure each deduction does not exceed a certain valuelet newdeduction80c = Math.min(150000, Number(document.getElementById('deduction80c').value));
          let newdeduction80c = 0;
          let newdeduction80cCC = 0;
          let newdeduction80ccd1 = 0;
          let newrestrictdeduction = Math.min(0, 150000, newdeduction80c + newdeduction80cCC + newdeduction80ccd1);
          let newdeduction80ccd1b = 0;
          let newdeduction80ccd2 = Math.max(Number(document.getElementById('deduction80ccd2').value), 0);
          let newdeduction80d = 0;
          let newdeduction80g = 0;
          let newdeduction80e = 0;
          let newdeduction80ee = 0;
          let newdeduction80tta = 0;
          let newdeduction80ttb = 0;
          let newanyotherdeduction = 0;
          let newtotaldeduction = newrestrictdeduction + newdeduction80ccd1b + newdeduction80ccd2 + newdeduction80d + newdeduction80g + newdeduction80e + newdeduction80ee + newdeduction80tta + newdeduction80ttb + newanyotherdeduction;
          let neweligiblededuction = Math.min(Math.max(newgrosstotalincome - (newstcgsec111a + newltcgsec112 + newltcgsec112a + newstcgsec111a_jul + newltcgsec112_jul + newltcgsec112a_jul + newwinninglottery + newvda), 0), newtotaldeduction);
          let newnetincome = Math.max(newgrosstotalincome - neweligiblededuction, 0);
          // Update the corresponding table cells with the calculated values for the new tax regime
          document.getElementById('newregimededuction80c').textContent = newdeduction80c.toFixed(2);
          document.getElementById('newregimededuction80ccc').textContent = newdeduction80cCC.toFixed(2);
          document.getElementById('newregimededuction80ccd1').textContent = newdeduction80ccd1.toFixed(2);
          document.getElementById('newregimerestrictdeduction').textContent = newrestrictdeduction.toFixed(2);
          document.getElementById('newregimededuction80ccd1b').textContent = newdeduction80ccd1b.toFixed(2);
          document.getElementById('newregimededuction80ccd2').textContent = newdeduction80ccd2.toFixed(2);
          document.getElementById('newregimededuction80d').textContent = newdeduction80d.toFixed(2);
          document.getElementById('newregimededuction80g').textContent = newdeduction80g.toFixed(2);
          document.getElementById('newregimededuction80e').textContent = newdeduction80e.toFixed(2);
          document.getElementById('newregimededuction80ee').textContent = newdeduction80ee.toFixed(2);
          document.getElementById('newregimededuction80tta').textContent = newdeduction80tta.toFixed(2);
          document.getElementById('newregimededuction80ttb').textContent = newdeduction80ttb.toFixed(2);
          document.getElementById('newregimeanyotherdeduction').textContent = newanyotherdeduction.toFixed(2);
          document.getElementById('newregimetotaldeduction').textContent = newtotaldeduction.toFixed(2);
          document.getElementById('newregimeeligiblededuction').textContent = neweligiblededuction.toFixed(2);
          document.getElementById('newregimenetincome').textContent = newnetincome.toFixed(2);
          let oldroundoff = Math.round(oldnetincome / 10) * 10;
          let newroundoff = Math.round(newnetincome / 10) * 10;
          document.getElementById('oldregimeroundoff').textContent = oldroundoff.toFixed(2);
          document.getElementById('newregimeroundoff').textContent = newroundoff.toFixed(2);
          //Setoff & Carry Forward for old
          let oldstcgsec111income = 0;
          let oldstcgsec111aincome = 0;
          let oldstcgsec111aincome_jul = 0;
          let oldstcglossforltcg = 0;
          let oldltcgsec112income = 0;
          let oldltcgsec112income_jul = 0;
          let oldltcgsec112aincome = 0;
          let oldltcgsec112aincome_jul = 0;
          //oldltcgsec111income after setoff for clculation
          if ((oldstcgsec111 + oldstcgsec111_jul + oldstcgsec111a_minus + oldstcgsec111a_minus_jul) > 0) {
            oldstcgsec111income = oldstcgsec111 + oldstcgsec111_jul + oldstcgsec111a_minus + oldstcgsec111a_minus_jul;
          } else {
            oldstcgsec111income = 0;
          }
          if ((oldstcgsec111a_jul + oldstcgsec111_minus + oldstcgsec111_minus_jul + oldstcgsec111a_minus) > 0) {
            oldstcgsec111aincome_jul = oldstcgsec111a_jul + oldstcgsec111_minus + oldstcgsec111_minus_jul + oldstcgsec111a_minus;
          } else {
            oldstcgsec111aincome_jul = 0;
          }
          if ((oldstcgsec111a + oldstcgsec111_minus + oldstcgsec111_minus_jul + oldstcgsec111a_minus_jul) > 0) {
            oldstcgsec111aincome = oldstcgsec111a + oldstcgsec111_minus + oldstcgsec111_minus_jul + oldstcgsec111a_minus_jul;
          } else {
            oldstcgsec111aincome = 0;
          }
          oldstcglossforltcg = Math.min(oldstcgsec111 + oldstcgsec111a + oldstcgsec111_jul + oldstcgsec111a_jul, 0);
          //oldltcgsec112income after setoff for clculation
          if ((oldltcgsec112 + oldltcgsec112a_minus + oldltcgsec112_minus_jul + oldltcgsec112a_minus_jul + oldstcglossforltcg) > 0) {
            oldltcgsec112income = oldltcgsec112 + oldltcgsec112a_minus + oldltcgsec112_minus_jul + oldltcgsec112a_minus_jul + oldstcglossforltcg;
          } else {
            oldltcgsec112income = 0;
          }
          //oldltcgsec112income_jul after setoff for clculation
          if ((oldltcgsec112_jul + oldltcgsec112_minus + oldltcgsec112a_minus + oldltcgsec112a_minus_jul + oldstcglossforltcg) > 0) {
            oldltcgsec112income_jul = oldltcgsec112_jul + oldltcgsec112_minus + oldltcgsec112a_minus + oldltcgsec112a_minus_jul + oldstcglossforltcg;
          } else {
            oldltcgsec112income_jul = 0;
          }
          //oldltcgsec112aincome_jul after setoff for clculation
          if ((oldltcgsec112a_jul + oldltcgsec112_minus + oldltcgsec112a_minus + oldltcgsec112_minus_jul + oldstcglossforltcg) > 0) {
            oldltcgsec112aincome_jul = oldltcgsec112a_jul + oldltcgsec112_minus + oldltcgsec112a_minus + oldltcgsec112_minus_jul + oldstcglossforltcg;
          } else {
            oldltcgsec112aincome_jul = 0;
          }
          //oldltcgsec112income after setoff for clculation
          if ((oldltcgsec112a + oldltcgsec112_minus + oldltcgsec112a_minus_jul + oldltcgsec112_minus_jul + oldstcglossforltcg) > 0) {
            oldltcgsec112aincome = oldltcgsec112a + oldltcgsec112_minus + oldltcgsec112a_minus_jul + oldltcgsec112_minus_jul + oldstcglossforltcg;
          } else {
            oldltcgsec112aincome = 0;
          }
          //Setoff & Carry Forward for new
          let newstcgsec111income = 0;
          let newstcgsec111aincome = 0;
          let newstcgsec111aincome_jul = 0;
          let newstcglossforltcg = 0;
          let newltcgsec112income = 0;
          let newltcgsec112income_jul = 0;
          let newltcgsec112aincome = 0;
          let newltcgsec112aincome_jul = 0;
          //newltcgsec111income after setoff for clculation
          if ((newstcgsec111 + newstcgsec111_jul + newstcgsec111a_minus + newstcgsec111a_minus_jul) > 0) {
            newstcgsec111income = newstcgsec111 + newstcgsec111_jul + newstcgsec111a_minus + newstcgsec111a_minus_jul;
          } else {
            newstcgsec111income = 0;
          }
          if ((newstcgsec111a_jul + newstcgsec111_minus + newstcgsec111_minus_jul + newstcgsec111a_minus) > 0) {
            newstcgsec111aincome_jul = newstcgsec111a_jul + newstcgsec111_minus + newstcgsec111_minus_jul + newstcgsec111a_minus;
          } else {
            newstcgsec111aincome_jul = 0;
          }
          if ((newstcgsec111a + newstcgsec111_minus + newstcgsec111_minus_jul + newstcgsec111a_minus_jul) > 0) {
            newstcgsec111aincome = newstcgsec111a + newstcgsec111_minus + newstcgsec111_minus_jul + newstcgsec111a_minus_jul;
          } else {
            newstcgsec111aincome = 0;
          }
          newstcglossforltcg = Math.min(newstcgsec111 + newstcgsec111a + newstcgsec111_jul + newstcgsec111a_jul, 0);
          //newltcgsec112income after setoff for clculation
          if ((newltcgsec112 + newltcgsec112a_minus + newltcgsec112_minus_jul + newltcgsec112a_minus_jul + newstcglossforltcg) > 0) {
            newltcgsec112income = newltcgsec112 + newltcgsec112a_minus + newltcgsec112_minus_jul + newltcgsec112a_minus_jul + newstcglossforltcg;
          } else {
            newltcgsec112income = 0;
          }
          //newltcgsec112income_jul after setoff for clculation
          if ((newltcgsec112_jul + newltcgsec112_minus + newltcgsec112a_minus + newltcgsec112a_minus_jul + newstcglossforltcg) > 0) {
            newltcgsec112income_jul = newltcgsec112_jul + newltcgsec112_minus + newltcgsec112a_minus + newltcgsec112a_minus_jul + newstcglossforltcg;
          } else {
            newltcgsec112income_jul = 0;
          }
          //newltcgsec112aincome_jul after setoff for clculation
          if ((newltcgsec112a_jul + newltcgsec112_minus + newltcgsec112a_minus + newltcgsec112_minus_jul + newstcglossforltcg) > 0) {
            newltcgsec112aincome_jul = newltcgsec112a_jul + newltcgsec112_minus + newltcgsec112a_minus + newltcgsec112_minus_jul + newstcglossforltcg;
          } else {
            newltcgsec112aincome_jul = 0;
          }
          //newltcgsec112income after setoff for clculation
          if ((newltcgsec112a + newltcgsec112_minus + newltcgsec112a_minus_jul + newltcgsec112_minus_jul + newstcglossforltcg) > 0) {
            newltcgsec112aincome = newltcgsec112a + newltcgsec112_minus + newltcgsec112a_minus_jul + newltcgsec112_minus_jul + newstcglossforltcg;
          } else {
            newltcgsec112aincome = 0;
          }
          //Old Normal Income & Special Income
          let oldspecialincome = oldstcgsec111aincome + oldltcgsec112income + oldltcgsec112aincome + oldstcgsec111aincome_jul + oldltcgsec112income_jul + oldltcgsec112aincome_jul + oldwinninglottery + oldvda;
          let oldnormalincome = oldroundoff - oldspecialincome;
          let oldtotalincome = oldnormalincome + oldspecialincome;
          let oldtaxonspecialincome = 0; // Math.max(oldstcgsec111aincome,0)*0.15 + Math.max(oldltcgsec112income,0)*0.2 + Math.max(oldltcgsec112aincome-(125000-Math.min(oldltcgsec112aincome_jul,125000)),0)*0.1 + Math.max(oldstcgsec111aincome_jul,0)*0.2 + Math.max(oldltcgsec112income_jul,0)*0.125 + Math.max(oldltcgsec112aincome_jul-125000,0)*0.125 + Math.max(oldwinninglottery,0)*0.3;
          let oldtaxonnormalincome = 0;
          let oldrebate = 0;
          let oldsurcharge = 0;
          let oldmarginalrelief = 0;
          let age = Number(document.getElementById('age').value);
          //Old Slab Rate benefit given to LTCG & STCG Special rates income not lottery
          if (oldnormalincome < 250000 && age < 60) {
            if (Math.max(oldltcgsec112, 0) > 250000) {
              oldtaxonspecialincome = Math.max(Math.max(oldltcgsec112, 0) - Math.max(250000 - oldnormalincome, 0), 0) * 0.2 + Math.max(oldstcgsec111aincome, 0) * 0.15 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldstcgsec111aincome_jul, 0) * 0.2 + Math.max(oldltcgsec112income_jul, 0) * 0.125 + Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else if (Math.max(oldltcgsec112, 0) + Math.max(oldstcgsec111aincome_jul, 0) > 250000) {
              oldtaxonspecialincome = Math.max(Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(250000 - oldnormalincome, 0), 0) * 0.2 + Math.max(oldstcgsec111aincome, 0) * 0.15 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldltcgsec112income_jul, 0) * 0.125 + Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else if (Math.max(oldltcgsec112, 0) + Math.max(oldstcgsec111aincome_jul, 0) + Math.max(oldstcgsec111aincome, 0) > 250000) {
              oldtaxonspecialincome = Math.max(Math.max(oldstcgsec111aincome, 0) - Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(250000 - oldnormalincome, 0), 0) * 0.15 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldltcgsec112income_jul, 0) * 0.125 + Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else if (Math.max(oldltcgsec112income_jul, 0) + Math.max(oldltcgsec112, 0) + Math.max(oldstcgsec111aincome_jul, 0) + Math.max(oldstcgsec111aincome, 0) > 250000) {
              oldtaxonspecialincome = Math.max(Math.max(oldltcgsec112income_jul, 0) - Math.max(oldstcgsec111aincome, 0) - Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(250000 - oldnormalincome, 0), 0) * 0.125 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else if (Math.max(oldltcgsec112aincome_jul - 125000, 0) + Math.max(oldltcgsec112income_jul, 0) + Math.max(oldltcgsec112, 0) + Math.max(oldstcgsec111aincome_jul, 0) + Math.max(oldstcgsec111aincome, 0) > 250000) {
              oldtaxonspecialincome = Math.max(Math.max(oldltcgsec112aincome_jul - 125000, 0) - Math.max(oldltcgsec112income_jul, 0) - Math.max(oldstcgsec111aincome, 0) - Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(250000 - oldnormalincome, 0), 0) * 0.125 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else {
              oldtaxonspecialincome = Math.max(Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) - Math.max(oldltcgsec112aincome_jul - 125000, 0) - Math.max(oldltcgsec112income_jul, 0) - Math.max(oldstcgsec111aincome, 0) - Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(250000 - oldnormalincome, 0), 0) * 0.1 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            }
          } else if (oldnormalincome < 300000 && age < 80) {
            if (Math.max(oldltcgsec112, 0) > 300000) {
              oldtaxonspecialincome = Math.max(Math.max(oldltcgsec112, 0) - Math.max(300000 - oldnormalincome, 0), 0) * 0.2 + Math.max(oldstcgsec111aincome, 0) * 0.15 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldstcgsec111aincome_jul, 0) * 0.2 + Math.max(oldltcgsec112income_jul, 0) * 0.125 + Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else if (Math.max(oldltcgsec112, 0) + Math.max(oldstcgsec111aincome_jul, 0) > 300000) {
              oldtaxonspecialincome = Math.max(Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(300000 - oldnormalincome, 0), 0) * 0.2 + Math.max(oldstcgsec111aincome, 0) * 0.15 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldltcgsec112income_jul, 0) * 0.125 + Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else if (Math.max(oldltcgsec112, 0) + Math.max(oldstcgsec111aincome_jul, 0) + Math.max(oldstcgsec111aincome, 0) > 300000) {
              oldtaxonspecialincome = Math.max(Math.max(oldstcgsec111aincome, 0) - Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(300000 - oldnormalincome, 0), 0) * 0.15 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldltcgsec112income_jul, 0) * 0.125 + Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else if (Math.max(oldltcgsec112income_jul, 0) + Math.max(oldltcgsec112, 0) + Math.max(oldstcgsec111aincome_jul, 0) + Math.max(oldstcgsec111aincome, 0) > 300000) {
              oldtaxonspecialincome = Math.max(Math.max(oldltcgsec112income_jul, 0) - Math.max(oldstcgsec111aincome, 0) - Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(300000 - oldnormalincome, 0), 0) * 0.125 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else if (Math.max(oldltcgsec112aincome_jul - 125000, 0) + Math.max(oldltcgsec112income_jul, 0) + Math.max(oldltcgsec112, 0) + Math.max(oldstcgsec111aincome_jul, 0) + Math.max(oldstcgsec111aincome, 0) > 300000) {
              oldtaxonspecialincome = Math.max(Math.max(oldltcgsec112aincome_jul - 125000, 0) - Math.max(oldltcgsec112income_jul, 0) - Math.max(oldstcgsec111aincome, 0) - Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(300000 - oldnormalincome, 0), 0) * 0.125 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else {
              oldtaxonspecialincome = Math.max(Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) - Math.max(oldltcgsec112aincome_jul - 125000, 0) - Math.max(oldltcgsec112income_jul, 0) - Math.max(oldstcgsec111aincome, 0) - Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(300000 - oldnormalincome, 0), 0) * 0.1 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            }
          } else if (oldnormalincome < 500000 && age > 80) {
            if (Math.max(oldltcgsec112, 0) > 500000) {
              oldtaxonspecialincome = Math.max(Math.max(oldltcgsec112, 0) - Math.max(500000 - oldnormalincome, 0), 0) * 0.2 + Math.max(oldstcgsec111aincome, 0) * 0.15 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldstcgsec111aincome_jul, 0) * 0.2 + Math.max(oldltcgsec112income_jul, 0) * 0.125 + Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else if (Math.max(oldltcgsec112, 0) + Math.max(oldstcgsec111aincome_jul, 0) > 500000) {
              oldtaxonspecialincome = Math.max(Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(500000 - oldnormalincome, 0), 0) * 0.2 + Math.max(oldstcgsec111aincome, 0) * 0.15 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldltcgsec112income_jul, 0) * 0.125 + Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else if (Math.max(oldltcgsec112, 0) + Math.max(oldstcgsec111aincome_jul, 0) + Math.max(oldstcgsec111aincome, 0) > 500000) {
              oldtaxonspecialincome = Math.max(Math.max(oldstcgsec111aincome, 0) - Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(500000 - oldnormalincome, 0), 0) * 0.15 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldltcgsec112income_jul, 0) * 0.125 + Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else if (Math.max(oldltcgsec112income_jul, 0) + Math.max(oldltcgsec112, 0) + Math.max(oldstcgsec111aincome_jul, 0) + Math.max(oldstcgsec111aincome, 0) > 500000) {
              oldtaxonspecialincome = Math.max(Math.max(oldltcgsec112income_jul, 0) - Math.max(oldstcgsec111aincome, 0) - Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(500000 - oldnormalincome, 0), 0) * 0.125 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else if (Math.max(oldltcgsec112aincome_jul - 125000, 0) + Math.max(oldltcgsec112income_jul, 0) + Math.max(oldltcgsec112, 0) + Math.max(oldstcgsec111aincome_jul, 0) + Math.max(oldstcgsec111aincome, 0) > 500000) {
              oldtaxonspecialincome = Math.max(Math.max(oldltcgsec112aincome_jul - 125000, 0) - Math.max(oldltcgsec112income_jul, 0) - Math.max(oldstcgsec111aincome, 0) - Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(500000 - oldnormalincome, 0), 0) * 0.125 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            } else {
              oldtaxonspecialincome = Math.max(Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) - Math.max(oldltcgsec112aincome_jul - 125000, 0) - Math.max(oldltcgsec112income_jul, 0) - Math.max(oldstcgsec111aincome, 0) - Math.max(oldstcgsec111aincome_jul, 0) - Math.max(oldltcgsec112, 0) - Math.max(500000 - oldnormalincome, 0), 0) * 0.1 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
            }
          } else {
            Math.max(oldstcgsec111aincome, 0) * 0.15 + Math.max(oldltcgsec112income, 0) * 0.2 + Math.max(oldltcgsec112aincome - (125000 - Math.min(oldltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(oldstcgsec111aincome_jul, 0) * 0.2 + Math.max(oldltcgsec112income_jul, 0) * 0.125 + Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(oldwinninglottery + oldvda, 0) * 0.3;
          }
          //Old Slab Rates
          if (age < 60 || age === "") {
            if (oldnormalincome <= 250000) {
              oldtaxonnormalincome = 0;
            } else if (oldnormalincome <= 500000) {
              oldtaxonnormalincome = 0.05 * (oldnormalincome - 250000);
            } else if (oldnormalincome <= 1000000) {
              oldtaxonnormalincome = 12500 + 0.2 * (oldnormalincome - 500000);
            } else {
              oldtaxonnormalincome = 112500 + 0.3 * (oldnormalincome - 1000000);
            }
          } else if (age >= 60 && age < 80) {
            if (oldnormalincome <= 300000) {
              oldtaxonnormalincome = 0;
            } else if (oldnormalincome <= 500000) {
              oldtaxonnormalincome = 0.05 * (oldnormalincome - 300000);
            } else if (oldnormalincome <= 1000000) {
              oldtaxonnormalincome = 10000 + 0.2 * (oldnormalincome - 500000);
            } else {
              oldtaxonnormalincome = 110000 + 0.3 * (oldnormalincome - 1000000);
            }
          } else { // age 80 and above
            if (oldnormalincome <= 500000) {
              oldtaxonnormalincome = 0;
            } else if (oldnormalincome <= 1000000) {
              oldtaxonnormalincome = 0.2 * (oldnormalincome - 500000);
            } else {
              oldtaxonnormalincome = 100000 + 0.3 * (oldnormalincome - 1000000);
            }
          }
          let oldtaxbeforerebate = oldtaxonnormalincome + oldtaxonspecialincome;
          //only LTCG112A benefit not given from rebate in old scheme but in new scheme no special income tax allowed
          if (oldtotalincome <= 500000) {
            oldrebate = Math.max(Math.min(oldtaxbeforerebate, 12500, oldtaxbeforerebate - Math.max(oldltcgsec112aincome - Math.min(125000, Math.max(oldltcgsec112aincome_jul, 0))) * 0.1 - Math.max(oldltcgsec112aincome_jul - 125000, 0) * 0.125), 0);
          } else {
            oldrebate = 0;
          }
          let oldtaxbeforesurcharge = oldtaxbeforerebate - oldrebate;
          let olddividend = Number(document.getElementById('oldregimedividendincome').textContent);
          let olddividendtax = (olddividend * oldtaxonnormalincome) / oldnormalincome;
          //Old Surcharge
          if ((oldnormalincome + oldwinninglottery - olddividendincome) > 50000000) {
            // 37% surcharge for income exceeding Rs. 5 crore
            oldsurcharge = (oldtaxonnormalincome + oldwinninglottery * 0.3 - olddividendtax) * 0.37 + (oldtaxonspecialincome + olddividendtax - oldwinninglottery * 0.3) * 0.15;
          } else if ((oldnormalincome + oldwinninglottery - olddividendincome) > 20000000) {
            // 25% surcharge for income exceeding Rs. 2 crore
            oldsurcharge = (oldtaxonnormalincome + oldwinninglottery * 0.3 - olddividendtax) * 0.25 + (oldtaxonspecialincome + olddividendtax - oldwinninglottery * 0.3) * 0.15;
          } else if ((oldtotalincome) > 10000000) {
            // 15% surcharge for income exceeding Rs. 1 crore
            oldsurcharge = oldtaxbeforesurcharge * 0.15;
          } else if ((oldtotalincome) > 5000000) {
            // 10% surcharge for income exceeding Rs. 50 lakh
            oldsurcharge = oldtaxbeforesurcharge * 0.10;
          } else {
            // No surcharge
            oldsurcharge = 0;
          }
          //Old Marginal Relief
          if (age < 60 || age === "") {
            if (oldtotalincome > 50000000) {
              oldmarginalrelief = Math.max((oldtaxbeforesurcharge + oldsurcharge - 18515625) - (oldtotalincome - 50000000), 0);
            } else if (oldtotalincome > 20000000) {
              oldmarginalrelief = Math.max((oldtaxbeforesurcharge + oldsurcharge - 6684375) - (oldtotalincome - 20000000), 0);
            } else if (oldtotalincome > 10000000) {
              oldmarginalrelief = Math.max((oldtaxbeforesurcharge + oldsurcharge - 3093750) - (oldtotalincome - 10000000), 0);
            } else if (oldtotalincome > 5000000) {
              oldmarginalrelief = Math.max((oldtaxbeforesurcharge + oldsurcharge - 1312500) - (oldtotalincome - 5000000), 0);
            } else {
              oldmarginalrelief = 0;
            }
          } else if (age >= 60 && age < 80) {
            if (oldtotalincome > 50000000) {
              oldmarginalrelief = Math.max((oldtaxbeforesurcharge + oldsurcharge - 18512500) - (oldtotalincome - 50000000), 0);
            } else if (oldtotalincome > 20000000) {
              oldmarginalrelief = Math.max((oldtaxbeforesurcharge + oldsurcharge - 6681500) - (oldtotalincome - 20000000), 0);
            } else if (oldtotalincome > 10000000) {
              oldmarginalrelief = Math.max((oldtaxbeforesurcharge + oldsurcharge - 3091000) - (oldtotalincome - 10000000), 0);
            } else if (oldtotalincome > 5000000) {
              oldmarginalrelief = Math.max((oldtaxbeforesurcharge + oldsurcharge - 1310000) - (oldtotalincome - 5000000), 0);
            } else {
              oldmarginalrelief = 0;
            }
          } else {
            if (oldtotalincome > 50000000) {
              oldmarginalrelief = Math.max((oldtaxbeforesurcharge + oldsurcharge - 18500000) - (oldtotalincome - 50000000), 0);
            } else if (oldtotalincome > 20000000) {
              oldmarginalrelief = Math.max((oldtaxbeforesurcharge + oldsurcharge - 6670000) - (oldtotalincome - 20000000), 0);
            } else if (oldtotalincome > 10000000) {
              oldmarginalrelief = Math.max((oldtaxbeforesurcharge + oldsurcharge - 3080000) - (oldtotalincome - 10000000), 0);
            } else if (oldtotalincome > 5000000) {
              oldmarginalrelief = Math.max((oldtaxbeforesurcharge + oldsurcharge - 1300000) - (oldtotalincome - 5000000), 0);
            } else {
              oldmarginalrelief = 0;
            }
          }
          let oldtaxbeforecess = oldtaxbeforesurcharge + oldsurcharge - oldmarginalrelief;
          let oldcess = Math.max(0, oldtaxbeforecess * 0.04);
          let oldgrosstaxpayable = Math.max(oldtaxbeforecess + oldcess, 0);
          document.getElementById('oldregimenormalincometax').textContent = oldtaxonnormalincome.toFixed(2);
          document.getElementById('oldregimespecialincometax').textContent = oldtaxonspecialincome.toFixed(2);
          document.getElementById('oldregimetaxbeforerebate').textContent = oldtaxbeforerebate.toFixed(2);
          document.getElementById('oldregimerebate87a').textContent = oldrebate.toFixed(2);
          document.getElementById('oldregimetaxbeforesurcharge').textContent = oldtaxbeforesurcharge.toFixed(2);
          document.getElementById('oldregimesurcharge').textContent = oldsurcharge.toFixed(2);
          document.getElementById('oldregimemarginalrelief').textContent = oldmarginalrelief.toFixed(2);
          document.getElementById('oldregimetaxbeforecess').textContent = oldtaxbeforecess.toFixed(2);
          document.getElementById('oldregimecess').textContent = oldcess.toFixed(2);
          document.getElementById('oldregimegrosstaxpayable').textContent = oldgrosstaxpayable.toFixed(2);
          //new Normal Income & Special Income
          let newspecialincome = newstcgsec111aincome + newltcgsec112income + newltcgsec112aincome + newstcgsec111aincome_jul + newltcgsec112income_jul + newltcgsec112aincome_jul + newwinninglottery + newvda;
          let newnormalincome = newroundoff - newspecialincome;
          let newtotalincome = newnormalincome + newspecialincome;
          let newtaxonspecialincome = 0; //Math.max(newstcgsec111aincome,0)*0.15 + Math.max(newltcgsec112income,0)*0.2 + Math.max(newltcgsec112aincome-(125000-Math.min(newltcgsec112aincome_jul,125000)),0)*0.1 + Math.max(newstcgsec111aincome_jul,0)*0.2 + Math.max(newltcgsec112income_jul,0)*0.125 + Math.max(newltcgsec112aincome_jul-125000,0)*0.125 + Math.max(newwinninglottery,0)*0.3;
          let newtaxonnormalincome = 0;
          let newrebate = 0;
          let newsurcharge = 0;
          let newmarginalrelief = 0;
          //Slab Rates
          if (newnormalincome <= 300000) {
            newtaxonnormalincome = 0;
          } else if (newnormalincome <= 700000) {
            newtaxonnormalincome = 0.05 * (newnormalincome - 300000);
          } else if (newnormalincome <= 1000000) {
            newtaxonnormalincome = 20000 + 0.1 * (newnormalincome - 700000);
          } else if (newnormalincome <= 1200000) {
            newtaxonnormalincome = 50000 + 0.15 * (newnormalincome - 1000000);
          } else if (newnormalincome <= 1500000) {
            newtaxonnormalincome = 80000 + 0.2 * (newnormalincome - 1200000);
          } else {
            newtaxonnormalincome = 140000 + 0.3 * (newnormalincome - 1500000);
          }
          // LTCG & STCG benefit from exemption limit will be given not lottery in new regime
          if (newnormalincome < 300000) {
            if (Math.max(newltcgsec112, 0) > 300000) {
              newtaxonspecialincome = Math.max(Math.max(newltcgsec112, 0) - Math.max(300000 - newnormalincome, 0), 0) * 0.2 + Math.max(newstcgsec111aincome, 0) * 0.15 + Math.max(newltcgsec112aincome - (125000 - Math.min(newltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(newstcgsec111aincome_jul, 0) * 0.2 + Math.max(newltcgsec112income_jul, 0) * 0.125 + Math.max(newltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(newwinninglottery + newvda, 0) * 0.3;
            } else if (Math.max(newltcgsec112, 0) + Math.max(newstcgsec111aincome_jul, 0) > 300000) {
              newtaxonspecialincome = Math.max(Math.max(newstcgsec111aincome_jul, 0) - Math.max(newltcgsec112, 0) - Math.max(300000 - newnormalincome, 0), 0) * 0.2 + Math.max(newstcgsec111aincome, 0) * 0.15 + Math.max(newltcgsec112aincome - (125000 - Math.min(newltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(newltcgsec112income_jul, 0) * 0.125 + Math.max(newltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(newwinninglottery + newvda, 0) * 0.3;
            } else if (Math.max(newltcgsec112, 0) + Math.max(newstcgsec111aincome_jul, 0) + Math.max(newstcgsec111aincome, 0) > 300000) {
              newtaxonspecialincome = Math.max(Math.max(newstcgsec111aincome, 0) - Math.max(newstcgsec111aincome_jul, 0) - Math.max(newltcgsec112, 0) - Math.max(300000 - newnormalincome, 0), 0) * 0.15 + Math.max(newltcgsec112aincome - (125000 - Math.min(newltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(newltcgsec112income_jul, 0) * 0.125 + Math.max(newltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(newwinninglottery + newvda, 0) * 0.3;
            } else if (Math.max(newltcgsec112income_jul, 0) + Math.max(newltcgsec112, 0) + Math.max(newstcgsec111aincome_jul, 0) + Math.max(newstcgsec111aincome, 0) > 300000) {
              newtaxonspecialincome = Math.max(Math.max(newltcgsec112income_jul, 0) - Math.max(newstcgsec111aincome, 0) - Math.max(newstcgsec111aincome_jul, 0) - Math.max(newltcgsec112, 0) - Math.max(300000 - newnormalincome, 0), 0) * 0.125 + Math.max(newltcgsec112aincome - (125000 - Math.min(newltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(newltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(newwinninglottery + newvda, 0) * 0.3;
            } else if (Math.max(newltcgsec112aincome_jul - 125000, 0) + Math.max(newltcgsec112income_jul, 0) + Math.max(newltcgsec112, 0) + Math.max(newstcgsec111aincome_jul, 0) + Math.max(newstcgsec111aincome, 0) > 300000) {
              newtaxonspecialincome = Math.max(Math.max(newltcgsec112aincome_jul - 125000, 0) - Math.max(newltcgsec112income_jul, 0) - Math.max(newstcgsec111aincome, 0) - Math.max(newstcgsec111aincome_jul, 0) - Math.max(newltcgsec112, 0) - Math.max(300000 - newnormalincome, 0), 0) * 0.125 + Math.max(newltcgsec112aincome - (125000 - Math.min(newltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(newwinninglottery + newvda, 0) * 0.3;
            } else {
              newtaxonspecialincome = Math.max(Math.max(newltcgsec112aincome - (125000 - Math.min(newltcgsec112aincome_jul, 125000)), 0) - Math.max(newltcgsec112aincome_jul - 125000, 0) - Math.max(newltcgsec112income_jul, 0) - Math.max(newstcgsec111aincome, 0) - Math.max(newstcgsec111aincome_jul, 0) - Math.max(newltcgsec112, 0) - Math.max(300000 - newnormalincome), 0) * 0.1 + Math.max(newwinninglottery + newvda, 0) * 0.3;
            }
          } else {
            newtaxonspecialincome = Math.max(newstcgsec111aincome, 0) * 0.15 + Math.max(newltcgsec112income, 0) * 0.2 + Math.max(newltcgsec112aincome - (125000 - Math.min(newltcgsec112aincome_jul, 125000)), 0) * 0.1 + Math.max(newstcgsec111aincome_jul, 0) * 0.2 + Math.max(newltcgsec112income_jul, 0) * 0.125 + Math.max(newltcgsec112aincome_jul - 125000, 0) * 0.125 + Math.max(newwinninglottery + newvda, 0) * 0.3;
          }
          let newtaxbeforerebate = newtaxonnormalincome + newtaxonspecialincome;
          const selectedValue = document.querySelector('select[name="combo_list"]').value;
          //LTCG112A benefit not given from rebate
          //  if (newtotalincome<= 700000) {
          //    newrebate = Math.max(Math.min(newtotalincome,25000,newtaxbeforerebate-Math.max(newltcgsec112aincome-Math.min(125000,Math.max(newltcgsec112aincome_jul,0)))*0.1 - Math.max(newltcgsec112aincome_jul-125000,0)*0.125),0);
          // } else {
          if (selectedValue === "Govt_utility") {
            if (newnormalincome <= 700000) {
              newrebate = Math.max(Math.min(newtaxonnormalincome, 25000), 0);
            } else {
              newrebate = Math.max(Math.min(newtaxonnormalincome, 25000) - (newnormalincome - 700000), 0);
            }
          } else {
            if (newtotalincome <= 700000) {
              newrebate = Math.max(Math.min(newtaxbeforerebate, 25000, newtaxbeforerebate - Math.max(newltcgsec112aincome - Math.min(125000, Math.max(newltcgsec112aincome_jul, 0))) * 0.1 - Math.max(newltcgsec112aincome_jul - 125000, 0) * 0.125), 0);
            } else {
              newrebate = Math.max(Math.max(Math.min(newtaxbeforerebate, newtaxbeforerebate - Math.max(newltcgsec112aincome - Math.min(125000, Math.max(newltcgsec112aincome_jul, 0))) * 0.1 - Math.max(newltcgsec112aincome_jul - 125000, 0) * 0.125), 0) - (newtotalincome - 700000), 0);
            }
          }
          let newtaxbeforesurcharge = newtaxbeforerebate - newrebate;
          let newdividend = Number(document.getElementById('newregimedividendincome').textContent);
          let newdividendtax = (newdividend * newtaxonnormalincome) / newnormalincome;
          //new Surcharge
          if ((newnormalincome + newwinninglottery - newdividendincome) > 20000000) {
            // 25% surcharge for income exceeding Rs. 2 crore
            newsurcharge = (newtaxonnormalincome + newwinninglottery * 0.3 - newdividendtax) * 0.25 + (newtaxonspecialincome + newdividendtax - newwinninglottery * 0.3) * 0.15;
          } else if ((newtotalincome) > 10000000) {
            // 15% surcharge for income exceeding Rs. 1 crore
            newsurcharge = newtaxbeforesurcharge * 0.15;
          } else if ((newtotalincome) > 5000000) {
            // 10% surcharge for income exceeding Rs. 50 lakh
            newsurcharge = newtaxbeforesurcharge * 0.10;
          } else {
            // No surcharge
            newsurcharge = 0;
          }
          //new Marginal Relief
          if (newtotalincome > 20000000) {
            newmarginalrelief = Math.max((newtaxbeforesurcharge + newsurcharge - 6543500) - (newtotalincome - 20000000), 0);
          } else if (newtotalincome > 10000000) {
            newmarginalrelief = Math.max((newtaxbeforesurcharge + newsurcharge - 2959000) - (newtotalincome - 10000000), 0);
          } else if (newtotalincome > 5000000) {
            newmarginalrelief = Math.max((newtaxbeforesurcharge + newsurcharge - 1190000) - (newtotalincome - 5000000), 0);
          } else {
            newmarginalrelief = 0;
          }
          let newtaxbeforecess = newtaxbeforesurcharge + newsurcharge - newmarginalrelief;
          let newcess = Math.max(0, newtaxbeforecess * 0.04);
          let newgrosstaxpayable = Math.max(newtaxbeforecess + newcess, 0);
          document.getElementById('newregimenormalincometax').textContent = newtaxonnormalincome.toFixed(2);
          document.getElementById('newregimespecialincometax').textContent = newtaxonspecialincome.toFixed(2);
          document.getElementById('newregimetaxbeforerebate').textContent = newtaxbeforerebate.toFixed(2);
          document.getElementById('newregimerebate87a').textContent = newrebate.toFixed(2);
          document.getElementById('newregimetaxbeforesurcharge').textContent = newtaxbeforesurcharge.toFixed(2);
          document.getElementById('newregimesurcharge').textContent = newsurcharge.toFixed(2);
          document.getElementById('newregimemarginalrelief').textContent = newmarginalrelief.toFixed(2);
          document.getElementById('newregimetaxbeforecess').textContent = newtaxbeforecess.toFixed(2);
          document.getElementById('newregimecess').textContent = newcess.toFixed(2);
          document.getElementById('newregimegrosstaxpayable').textContent = newgrosstaxpayable.toFixed(2);
        }
  document.querySelectorAll("input, select, textarea, radio, checkbox").forEach(element => {
    element.addEventListener("input", function() {
      CalculateAllIncome();
      saveToLocalStorage(); // Save on every input
    });
    element.addEventListener("change", function() {
      CalculateAllIncome();
      saveToLocalStorage(); // Save on every change
    });
  });
        document.querySelectorAll('input, select').forEach(input => {
    // Clear all inputs
    input.dispatchEvent(new Event('input')); // Ye event trigger karega
  });
       //Page Load hone par CalculateAllIncome function run kar rha h jis se value blank ki jgh zero show ho rhi h resulted fields m
        CalculateAllIncome();
        saveToLocalStorage(); 
  loadFromLocalStorage(); // Load data when page loads
});
      //}else{
      //  alert("Don't waste your time for copying. This file is fully secured by Sumit Garg. If any query, Contact - Sumit Garg, Ph. No. - 9716804520, Email - SumitGarg100000@Gmail.com ");
      //    } 
      //   }   else      {       alert("Don't waste your time for copying. This file is fully secured by Sumit Garg. If any query, Contact - Sumit Garg, Ph. No. - 9716804520, Email - SumitGarg100000@Gmail.com ");     }
    
