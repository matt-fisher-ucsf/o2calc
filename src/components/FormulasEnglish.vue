<template>
  <div class="c23">
  <p style = "padding-bottom: 2em;">
    This calculator is a collaborative effort of multiple individuals and initiatives.
    To learn more about us or to get in touch, please visit the
    <a href="https://opencriticalcare.org/">OpenCriticalCare.org Project</a>.
  </p>
  <p class="c8">
    <span class="c18 c45">Oxygen Calculator Formulas and Assumptions</span>
  </p>
  <p class="c5"><span class="c3 c18"></span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c15">PaO2 Imputation Calculation : </span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3">SaO&#8322; = user input range 0 to 100%</span>
  </p>
  <p class="c8">
    <span class="c4 c3">FiO&#8322; = &nbsp;user input range 0 to 100%</span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c4 c3">Imputed PO&#8322; = </span></p>
  <p class="c8">
    <span class="c4 c3"
      >( 11700 / ( (1/SaO&#8322;) - 1 ) + ( 50^3 + (11700 / ( (1/SaO&#8322;) -
      1 ))^2 ) ^1/2 ) ^ &#8531;</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3">Imputed P:F = Imputed PO&#8322; / FiO&#8322;</span>
  </p>
  <p class="c8">
    <span class="c3">S:F = (SaO&#8322; * 100) / &nbsp;FiO&#8322;</span
    ><span
      style="
        overflow: hidden;
        display: inline-block;
        margin: 0px 0px;
        border: 0px solid #000000;
        transform: rotate(0rad) translateZ(0px);
        -webkit-transform: rotate(0rad) translateZ(0px);
        width: 624px;
        height: 246.67px;
      "
      >
      <img
        style="width: 100%;"
        alt="non-linear equation derived in Brown et al Chest 2016"
        src="../assets/brown_etal_nonlinear_equation.png"
      />
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c15">Cylinder Duration Calculations:</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Cylinder constants used in duration calculations:</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;Size C&#39;: 0.085</span></p>
  <p class="c8"><span class="c3 c4">&nbsp; &#39;Size D&#39;: 0.17</span></p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;Size E&#39;: 0.34</span></p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;Size F&#39;: 0.68</span></p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;Size G&#39;: 1.7</span></p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;Size J&#39;: 3.40</span></p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;Size K&#39;: 3.55</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Remaining Supply = cylinder constant * (gauge pressure - residual
      pressure)</span
    >
  </p>
  <p class="c8">
    <span class="c4 c3">Remaining Time = Remaining Supply / Flow Rate</span>
  </p>
  <p class="c8"><span class="c3">Pressure in psi and Flow in LPM</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >* Of note: cylinder size terminology and volumes are not universally
      standard. You must check with the local manufacturer for cylinder
      capacity and size/capacity.
    </span>
  </p>
  <p class="c8">
    <span class="c4 c3"
      >*Service pressure for aluminum cylinders is approximately 2000-2200
      psi, while service pressure for steel cylinders may vary more widely.
      Always check with the manufacturer for specifications.
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c15">Cylinder Size Calculations:</span></p>
  <p class="c5"><span class="c18 c3"></span></p>
  <p class="c8">
    <span class="c3 c13"
      >The cylinder capacity calculator uses volumetric calculations based on
      height, circumference (or width), and wall thickness to estimate volume
      of the cylinder (see formulas below). </span
    ><span class="c3 c13"
      >This calculator assumes the shape of a cylinder which will vary from
      the actual shape of a gas cylinder - see ISO 7866 and </span
    ><span class="c3 c36 c13 c40">ISO 9809</span
    ><span class="c3 c13">&nbsp;for details. </span
    ><span class="c1"
      >Steel and aluminum cylinders have different wall thicknesses and
      knowing which type of cylinder you have is necessary for accurate
      estimations.
    </span>
  </p>
  <p class="c5"><span class="c1"></span></p>
  <p class="c8">
    <span class="c3 c13"
      >Calculated cylinder volume may vary from actual or manufacturer
      reported cylinder volume due to differences between the entered and
      actual wall thickness, shape of the bottom or top of the cylinder, or
      the fill pressure used to define capacity, among other potential
      factors. See </span
    ><span class="c13 c20">ISO7866 and ISO9809</span>
  </p>
  <p class="c5"><span class="c1"></span></p>
  <p class="c29">
    <span class="c17 c24 c13">Gaseous oxygen volume </span
    ><span class="c17 c13"
      >= (Cylinder pressure in PSI/2000) x (cylinder pressure in psi/</span
    ><span class="c13 c36">14.696</span
    ><span class="c0"
      >) x pi [(outer diameter - 2(wall thickness))/2]^2 x [(height without
      valve)-(wall thickness) / 1000 / 1000</span
    >
  </p>
  <p class="c29 c27"><span class="c17 c24 c13 c31"></span></p>
  <p class="c29">
    <span class="c17 c13 c24">Liquid water volume capacity </span
    ><span class="c13 c17"
      >= pi [(outer diameter - 2(wall thickness)/2)]^2 x [(height without
      valve)-(wall thickness) / 1000 / 1000</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c15">Oxygen Supply Calculations:</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c1">Conversion factors</span></p>
  <p class="c5"><span class="c1"></span></p>
  <p class="c8"><span class="c4 c3">1 Gallon = 3.79 Liters</span></p>
  <p class="c8"><span class="c4 c3">1 Cubic Meter = 1000 Liters</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c1">Cylinder Supply: </span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >User inputs size of cylinder and number of cylinders. &nbsp;We use the
      following constants in Liters * number of cylinders.</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c3"
      >&nbsp; &#39;Size C&#39;:
      170&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    ><span class="c3">Tank Constant 0.085</span>
  </p>
  <p class="c8">
    <span class="c4 c3"
      >&nbsp; &#39;Size D&#39;:
      340&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tank Constant
      0.17</span
    >
  </p>
  <p class="c8">
    <span class="c3"
      >&nbsp; &#39;Size E&#39;:
      680&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    ><span class="c3">Tank Constant 0.34</span>
  </p>
  <p class="c8">
    <span class="c3"
      >&nbsp; &#39;Size F&#39;:
      1360&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    ><span class="c3">Tank Constant 0.68</span>
  </p>
  <p class="c8">
    <span class="c4 c3"
      >&nbsp; &#39;Size G&#39;:
      4100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    >
  </p>
  <p class="c8">
    <span class="c3"
      >&nbsp; &#39;Size H&#39;:
      6600&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    ><span class="c3">Tank Constant 3.14</span>
  </p>
  <p class="c8">
    <span class="c3"
      >&nbsp; &#39;Size J&#39;:
      6800&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    ><span class="c3">Tank Constant 3.4</span>
  </p>
  <p class="c8">
    <span class="c3"
      >&nbsp; &#39;Size K&#39;:
      7100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    ><span class="c3">Tank Constant 3.55</span>
  </p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;7500L&#39;: 7500</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >* Of note: cylinder size terminology and volumes are not universally
      standard. You must check with local manufacturer&rsquo;s for cylinder
      capacity and size/capacity.
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Duration = (Tank Constant)(Gauge pressure - residual pressure) / Flow
    </span>
  </p>
  <p class="c8"><span class="c4 c3">Pressure in psi and Flow in LPM</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c1"></span></p>
  <p class="c5"><span class="c21 c13"></span></p>
  <p class="c5"><span class="c21 c13"></span></p>
  <p class="c5"><span class="c18 c44"></span></p>
  <p class="c8">
    <span class="c22 c13">Plant and Concentrator Supply:</span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >User inputs quantity per unit of time and we convert to Liters per day
      * % day safely run * leakage factor</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >&nbsp; per minute Quantity * Liter Conversion * 60 * 24 * % day safely
      run * leakage factor</span
    >
  </p>
  <p class="c8">
    <span class="c4 c3"
      >&nbsp; per hour Quantity * Liter Conversion * 24 * % day safely run *
      leakage factor</span
    >
  </p>
  <p class="c8">
    <span class="c4 c3"
      >&nbsp; per day Quantity * Liter Conversion * % day safely run * leakage
      factor</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >For concentrators, user inputs number of concentrators and calculator
      multiplies above by number of concentrators.</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c13 c22">Liquid (VIE) Supply:</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >User inputs total quantity in gallons or Liters (note we eliminated
      height as an option since we could not find a reliable calculation or
      constant).</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >&nbsp; Quantity converted to Liters * 861 * leakage factor</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >861 is the expansion factor of liquid oxygen to gaseous oxygen.</span
    >
  </p>
  <p class="c8">
    <span class="c3"
      >This comes from the ideal gas law, and we assume conditions of room
      temperature </span
    ><span class="c3"
      >(typically from 20C-22C) and standard pressure (1 atm)</span
    ><span class="c4 c3">:</span>
  </p>
  <ul class="c33 lst-kix_c6484vol7bjv-0 start">
    <li class="c8 c26 li-bullet-0">
      <span class="c3">Temperature assumption: </span
      ><span class="c3 c10">20 degrees [Celsius/Fahrenheit]</span>
    </li>
    <li class="c8 c26 li-bullet-0">
      <span class="c3">Altitude: </span
      ><span class="c3 c37">0 [feet/meters]</span
      ><span class="c3">&nbsp;= 1 atm</span>
    </li>
  </ul>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c4 c3">Ideal gas law: PV = nRT</span></p>
  <p class="c8"><span class="c4 c3">P = pressure (in atm) </span></p>
  <p class="c8"><span class="c4 c3">V = volume (in Liters)</span></p>
  <p class="c8">
    <span class="c4 c3">n = amount of substance (in moles)</span>
  </p>
  <p class="c8">
    <span class="c4 c3"
      >R = ideal gas constant = 0.0821 (units are (Liters*atm)/(Kelvin*n) )
    </span>
  </p>
  <p class="c8">
    <span class="c4 c3">T = absolute temperature (in Kelvin) </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <ul class="c33 lst-kix_ggp9jru9blgi-0 start">
    <li class="c8 c26 li-bullet-0">
      <span class="c4 c3"
        >To calculate volume (in Liters) of gaseous oxygen from liquid oxygen
        (in Liters), convert Liters of liquid oxygen to moles of oxygen.
      </span>
    </li>
    <li class="c8 c26 li-bullet-0">
      <span class="c4 c3"
        >Multiply the Liters of liquid oxygen by 1000 to convert from Liters
        to mL, then multiply by its density, 1.14g/mL to obtain mass of
        oxygen. Divide mass of oxygen by its molecular mass (O2 so 32g/mole)
        to obtain moles (n) of oxygen.
      </span>
    </li>
    <li class="c8 c26 li-bullet-0">
      <span class="c4 c3"
        >Convert temperature to Kelvin (if Celsius, add 273.15).
      </span>
    </li>
    <li class="c8 c26 li-bullet-0">
      <span class="c4 c3">This input is entered into the ideal gas law:</span>
    </li>
  </ul>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c42 c48">
    <span class="c4 c3">Liters of gaseous oxygen = V = (nRT) / P</span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >When sea level and room temperature are assumed, this simplifies
      to:</span
    >
  </p>
  <ul class="c33 lst-kix_v1p2mms7yikw-0 start">
    <li class="c8 c26 li-bullet-0">
      <span class="c4 c3"
        >Liters of liquid oxygen * 861 = Liters of gaseous oxygen.</span
      >
    </li>
    <li class="c8 c26 li-bullet-0">
      <span class="c4 c3"
        >Leakage factor is then included to take into account leaks from
        equipment.
      </span>
    </li>
  </ul>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c1"></span></p>
  <p class="c8">
    <span class="c22 c13">For demand (device consumption) calculations </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c3">U</span
    ><span class="c4 c3"
      >ser inputs number of devices and flow rate in LPM and we multiply the
      sum for usage in Liters per day.</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Manufacturer specifications must always be referenced especially when
      using delivery devices with bias flow, turbines and compressors.
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Device consumption does not include consideration for device leak or
      leak at the patient interface which may be commonly encountered.</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c24 c25">Oxygen </span
    ><span class="c24 c25">Consumption Calculations:</span
    ><span class="c4 c3">&nbsp;</span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c3">Consumption is </span
    ><span class="c37 c3">liters per day of 100% O2 consumed</span
    ><span class="c3">, unless otherwise stated or set by the user</span
    ><span class="c4 c3"
      >. This calculator does not account for consumption of medical air,
      which may be required by some devices.
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c3"
      >For the modeled ward scenario, users can manipulate the size of the
      ward and the severity of hypoxemia for patients. Some facilities may not
      have access to all listed delivery devices and the user must manually
      set those to zero. </span
    ><span class="c3 c36"
      >Estimates of oxygen consumption are derived from expert opinion.
      Although cross-sectional oxygen usage data have been published from
      early in the COVID-19 pandemic, the evolution of respiratory support
      practices&mdash;particularly the timing of intubation and the roles of
      non-invasive ventilation and high flow nasal oxygen&mdash;has limited
      the degree to which these data can be used to guide present-day
      estimates of oxygen demand.</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <a id="t.744aa7fb45e67f119b326019eef0c3c60293c5bd"></a><a id="t.0"></a>
  <table class="c14">
    <tbody>
      <tr class="c32">
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c2">Study author, journal year (url link)</span>
          </p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c2">Total # patients in study cohort</span>
          </p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">Location</span></p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">0-5LPM (NC)</span></p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">5-10LPM (FM)</span></p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">10-15LPM (Non rebreather)</span></p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">CPAP/BIPAP</span></p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">High flow nasal cannula</span></p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">Mechanical ventilation</span></p>
        </td>
      </tr>
      <tr class="c39">
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c30 c12"
              ><a
                class="c16"
                href="https://www.google.com/url?q=https://www.atsjournals.org/doi/abs/10.1513/AnnalsATS.202008-1080OC&amp;sa=D&amp;source=editors&amp;ust=1630845893761000&amp;usg=AOvVaw08xMVA6IDDtsdmmy9mNArf"
                >Bellani et al, Annals ATS, 2021</a
              ></span
            >
          </p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">8753</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">Milan, Italy</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">NA</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">NA</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">NA</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c4 c12"
              >10.4% (outside ICU); 6.2% in ICU. Mean FiO2 Also provides
              breakdown of CPAP vs NPPV</span
            >
          </p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">0.4%. Mean FiO2 59.2%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">9.20%</span></p>
        </td>
      </tr>
      <tr class="c28">
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c30 c12"
              ><a
                class="c16"
                href="https://www.google.com/url?q=https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7182961/&amp;sa=D&amp;source=editors&amp;ust=1630845893765000&amp;usg=AOvVaw3WfXuk2Va-5dSdJscCpGBn"
                >Meyers et al, Kaiser Permanente Northern California JAMA</a
              ></span
            >
          </p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">377</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">Northern CA</span></p>
        </td>
        <td class="c43" colspan="3" rowspan="1">
          <p class="c42"><span class="c4 c12">39.20%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">2.10%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">3.20%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">29.20%</span></p>
        </td>
      </tr>
      <tr class="c47">
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c30 c12"
              ><a
                class="c16"
                href="https://www.google.com/url?q=https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7392471/&amp;sa=D&amp;source=editors&amp;ust=1630845893768000&amp;usg=AOvVaw0ZRVlm6e-kymf1Fu1VIKE-"
                >Ferguson et al, KP Northern California EID</a
              ></span
            >
          </p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">72</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">Northern CA</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">30.60%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">NA</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">8.30%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">NA</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">2.80%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">18.10%</span></p>
        </td>
      </tr>
      <tr class="c38">
        <td class="c19" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c12 c30"
              ><a
                class="c16"
                href="https://www.google.com/url?q=https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7256651/&amp;sa=D&amp;source=editors&amp;ust=1630845893786000&amp;usg=AOvVaw1N7SFhfsCTqOSGIDDE_Tpk"
                >Argenziano et al, NYP Columbia BMJ Open</a
              ></span
            >
          </p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">1000</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">NYC</span></p>
        </td>
        <td class="c35" colspan="2" rowspan="1">
          <p class="c42"><span class="c4 c12">56%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">36.50%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">14%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">4.1% (Venturi + HFNC)</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">23.30%</span></p>
        </td>
      </tr>
    </tbody>
  </table>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c1"></span></p>
  <p class="c8">
    <span class="c1">For nasal cannula, facemask, and non-rebreather </span>
  </p>
  <p class="c8">
    <span class="c4 c3"
      >FiO2 is assumed to be 1.0 and flow rates are adjustable in liters per
      minute.</span
    >
  </p>
  <p class="c8">
    <span class="c4 c3"
      >Liter per day consumption of O2 = device flow rate L/minute x 60
      minutes/hr x 24 hr/day
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c1">For high flow nasal cannula</span></p>
  <p class="c8">
    <span class="c4 c3"
      >FiO2 is adjustable (defaulted to 1.0) and flow rate is adjustable in
      liters per minute.</span
    >
  </p>
  <p class="c8">
    <span class="c4 c3"
      >Liter per day consumption of O2 = device flow rate L/minute x 60
      minutes/hr x 24 hr/day; flow rate in LPM = device flow rate x (FiO2 -
      0.21)/0.79</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c1">For ventilator, CPAP, BIPAP/NIPPV</span></p>
  <p class="c8">
    <span class="c4 c3"
      >FiO2 is adjustable (defaulted to 1.0) and flow rate is adjustable in
      liters per minute and dependent on multiple factors.</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Liter per day consumption of O2 = device O2 consumption rate L/minute x
      60 minutes/hr x 24 hr/day</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c3"
      >Device O2 consumption rate in LPM = (Minute ventilation + (bias flow x
      RR x expiratory time/60) + leak) x (FiO2 - 0.21)/0.79</span
    >
  </p>
  </div>
</template>

<style scoped>
.lst-kix_v1p2mms7yikw-0>li:before{content:"-  "}.lst-kix_v1p2mms7yikw-1>li:before{content:"-  "}.lst-kix_c6484vol7bjv-2>li:before{content:"-  "}.lst-kix_c6484vol7bjv-1>li:before{content:"-  "}.lst-kix_c6484vol7bjv-0>li:before{content:"-  "}ul.lst-kix_ggp9jru9blgi-4{list-style-type:none}ul.lst-kix_ggp9jru9blgi-5{list-style-type:none}ul.lst-kix_ggp9jru9blgi-6{list-style-type:none}ul.lst-kix_ggp9jru9blgi-7{list-style-type:none}ul.lst-kix_ggp9jru9blgi-0{list-style-type:none}ul.lst-kix_ggp9jru9blgi-1{list-style-type:none}ul.lst-kix_ggp9jru9blgi-2{list-style-type:none}ul.lst-kix_ggp9jru9blgi-3{list-style-type:none}ul.lst-kix_ggp9jru9blgi-8{list-style-type:none}.lst-kix_c6484vol7bjv-3>li:before{content:"-  "}.lst-kix_c6484vol7bjv-4>li:before{content:"-  "}.lst-kix_c6484vol7bjv-5>li:before{content:"-  "}.lst-kix_c6484vol7bjv-6>li:before{content:"-  "}.lst-kix_ggp9jru9blgi-7>li:before{content:"-  "}.lst-kix_ggp9jru9blgi-8>li:before{content:"-  "}.lst-kix_c6484vol7bjv-7>li:before{content:"-  "}.lst-kix_c6484vol7bjv-8>li:before{content:"-  "}.lst-kix_ggp9jru9blgi-3>li:before{content:"-  "}.lst-kix_ggp9jru9blgi-2>li:before{content:"-  "}.lst-kix_ggp9jru9blgi-4>li:before{content:"-  "}ul.lst-kix_v1p2mms7yikw-8{list-style-type:none}.lst-kix_ggp9jru9blgi-6>li:before{content:"-  "}ul.lst-kix_v1p2mms7yikw-5{list-style-type:none}.lst-kix_ggp9jru9blgi-5>li:before{content:"-  "}ul.lst-kix_v1p2mms7yikw-4{list-style-type:none}ul.lst-kix_v1p2mms7yikw-7{list-style-type:none}ul.lst-kix_v1p2mms7yikw-6{list-style-type:none}.lst-kix_ggp9jru9blgi-0>li:before{content:"-  "}.lst-kix_ggp9jru9blgi-1>li:before{content:"-  "}ul.lst-kix_c6484vol7bjv-4{list-style-type:none}.lst-kix_v1p2mms7yikw-8>li:before{content:"-  "}ul.lst-kix_c6484vol7bjv-5{list-style-type:none}ul.lst-kix_c6484vol7bjv-6{list-style-type:none}ul.lst-kix_c6484vol7bjv-7{list-style-type:none}ul.lst-kix_c6484vol7bjv-8{list-style-type:none}.lst-kix_v1p2mms7yikw-7>li:before{content:"-  "}.lst-kix_v1p2mms7yikw-2>li:before{content:"-  "}li.li-bullet-0:before{margin-left:-18pt;white-space:nowrap;display:inline-block;min-width:18pt}ul.lst-kix_v1p2mms7yikw-1{list-style-type:none}ul.lst-kix_v1p2mms7yikw-0{list-style-type:none}ul.lst-kix_v1p2mms7yikw-3{list-style-type:none}ul.lst-kix_v1p2mms7yikw-2{list-style-type:none}.lst-kix_v1p2mms7yikw-3>li:before{content:"-  "}.lst-kix_v1p2mms7yikw-4>li:before{content:"-  "}.lst-kix_v1p2mms7yikw-5>li:before{content:"-  "}ul.lst-kix_c6484vol7bjv-0{list-style-type:none}.lst-kix_v1p2mms7yikw-6>li:before{content:"-  "}ul.lst-kix_c6484vol7bjv-1{list-style-type:none}ul.lst-kix_c6484vol7bjv-2{list-style-type:none}ul.lst-kix_c6484vol7bjv-3{list-style-type:none}ol{margin:0;padding:0}table td,table th{padding:0}.c34{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:46.8pt;border-top-color:#000000;border-bottom-style:solid}.c19{border-right-style:solid;padding:2pt 2pt 2pt 2pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:bottom;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:46.8pt;border-top-color:#000000;border-bottom-style:solid}.c41{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:0pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:46.8pt;border-top-color:#000000;border-bottom-style:solid}.c6{border-right-style:solid;padding:2pt 2pt 2pt 2pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:46.8pt;border-top-color:#000000;border-bottom-style:solid}.c46{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:0pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:46.8pt;border-top-color:#000000;border-bottom-style:solid}.c35{border-right-style:solid;padding:2pt 2pt 2pt 2pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:93.6pt;border-top-color:#000000;border-bottom-style:solid}.c43{border-right-style:solid;padding:2pt 2pt 2pt 2pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:140.4pt;border-top-color:#000000;border-bottom-style:solid}.c0{background-color:#ffffff;color:#202124;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:italic}.c10{-webkit-text-decoration-skip:none;color:#000000;font-weight:400;text-decoration:underline;vertical-align:baseline;text-decoration-skip-ink:none;font-family:"Arial";font-style:normal}.c1{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:12pt;font-family:"Arial";font-style:italic}.c5{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c15{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:14pt;font-family:"Arial";font-style:normal}.c21{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial"}.c18{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-family:"Arial";font-style:normal}.c22{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:13pt;font-family:"Arial"}.c8{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c4{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-family:"Arial";font-style:normal}.c31{text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial"}.c42{padding-top:0pt;padding-bottom:0pt;line-height:1.15;text-align:center}.c11{padding-top:0pt;padding-bottom:0pt;line-height:1.15;text-align:left}.c29{padding-top:0pt;padding-bottom:0pt;line-height:1.0;text-align:left}.c14{border-spacing:0;border-collapse:collapse;margin-right:auto}.c30{text-decoration-skip-ink:none;-webkit-text-decoration-skip:none;color:#1155cc;text-decoration:underline}.c9{padding-top:0pt;padding-bottom:0pt;line-height:1.15;text-align:right}.c40{color:#212529;font-weight:400;font-family:"Montserrat"}.c23{background-color:#ffffff;padding:72pt 72pt 72pt 72pt}.c37{text-decoration-skip-ink:none;-webkit-text-decoration-skip:none;text-decoration:underline}.c2{font-weight:700;font-family:"Calibri"}.c26{margin-left:36pt;padding-left:0pt}.c33{padding:0;margin:0}.c48{orphans:2;widows:2}.c17{background-color:#ffffff;color:#202124}.c16{color:inherit;text-decoration:inherit}.c39{height:82.5pt}.c47{height:37.5pt}.c24{font-weight:700}.c3{font-size:12pt}.c45{font-size:17pt}.c25{font-size:14pt}.c44{font-size:13pt}.c12{font-size:10pt}.c38{height:48.8pt}.c27{height:11pt}.c36{background-color:#ffffff}.c7{background-color:#d9d9d9}.c20{color:#595959}.c32{height:42pt}.c28{height:71.2pt}.c13{font-style:italic}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}
</style>