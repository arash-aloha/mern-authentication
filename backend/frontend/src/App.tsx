import "./App.css";
import Header from "./components/header";

function App() {
  return (
    <div className="App">
      <Header />

      <div className="blob-container">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="100%"
          id="blobSvg1"
          style={{ opacity: 1 }}
          filter="blur(0px)"
          transform="rotate(152)"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#f3b359" }}></stop>
              <stop offset="100%" style={{ stopColor: "#f93434" }}></stop>
            </linearGradient>
          </defs>
          <path id="blob" fill="url(#gradient1)" style={{ opacity: 0.9 }}>
            <animate
              attributeName="d"
              dur="20.2s"
              repeatCount="indefinite"
              values="M410.95278,296.31131Q377.83016,342.62262,346.59668,396.40799Q315.3632,450.19336,253.66275,438.70512Q191.9623,427.21687,143.72172,394.79004Q95.48115,362.3632,86.24057,306.1816Q77,250,74.51885,185.3632Q72.0377,120.72639,123.0377,68.91975Q174.0377,17.1131,239.88914,47.47163Q305.74057,77.83016,366.40332,99.75233Q427.06607,121.67451,435.57074,185.83725Q444.0754,250,410.95278,296.31131Z;M460.19079,314.81752Q429.48296,379.63503,366.74655,397.33779Q304.01014,415.04055,238.62673,450.6401Q173.24331,486.23965,141.80231,418.853Q110.3613,351.46635,87.51337,300.73317Q64.66545,250,86.56406,198.80231Q108.46268,147.60462,149.75669,107.39355Q191.05069,67.18248,258.9189,40.41566Q326.7871,13.64883,381.21107,64.45621Q435.63503,115.26359,463.26683,182.63179Q490.89862,250,460.19079,314.81752Z;M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z;M437.48517,301.93698Q392.82947,353.87396,357.50371,413.21131Q322.17795,472.54867,247.51112,479.51159Q172.8443,486.47452,129.54819,427.64458Q86.25209,368.81464,81.57785,309.40732Q76.90361,250,83.86283,191.93327Q90.82205,133.86654,141.98146,104.152Q193.14087,74.43745,247.01483,83.88926Q300.88878,93.34106,355.51112,113.62234Q410.13346,133.90361,446.13717,191.95181Q482.14087,250,437.48517,301.93698Z;M423.38828,307.00416Q406.39243,364.00831,353.55217,384.57202Q300.71191,405.13573,242.06787,430.50416Q183.42382,455.87258,116.5554,425.63666Q49.68697,395.40075,58.87581,322.70037Q68.06464,250,86.66067,197.31625Q105.2567,144.63251,148.86843,108.53648Q192.48015,72.44045,252.10019,66.13989Q311.72022,59.83933,378.54063,84.21929Q445.36105,108.59925,442.87258,179.29963Q440.38412,250,423.38828,307.00416Z;M410.95278,296.31131Q377.83016,342.62262,346.59668,396.40799Q315.3632,450.19336,253.66275,438.70512Q191.9623,427.21687,143.72172,394.79004Q95.48115,362.3632,86.24057,306.1816Q77,250,74.51885,185.3632Q72.0377,120.72639,123.0377,68.91975Q174.0377,17.1131,239.88914,47.47163Q305.74057,77.83016,366.40332,99.75233Q427.06607,121.67451,435.57074,185.83725Q444.0754,250,410.95278,296.31131Z"
            ></animate>
          </path>
        </svg>
        {/* for glowing effect */}
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="100%"
          id="blobSvg1"
          style={{ opacity: 1 }}
          filter="blur(40px)"
          transform="rotate(152)"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#f3b359" }}></stop>
              <stop offset="100%" style={{ stopColor: "#f93434" }}></stop>
            </linearGradient>
          </defs>
          <path id="blob" fill="url(#gradient1)" style={{ opacity: 0.9 }}>
            <animate
              attributeName="d"
              dur="20.2s"
              repeatCount="indefinite"
              values="M410.95278,296.31131Q377.83016,342.62262,346.59668,396.40799Q315.3632,450.19336,253.66275,438.70512Q191.9623,427.21687,143.72172,394.79004Q95.48115,362.3632,86.24057,306.1816Q77,250,74.51885,185.3632Q72.0377,120.72639,123.0377,68.91975Q174.0377,17.1131,239.88914,47.47163Q305.74057,77.83016,366.40332,99.75233Q427.06607,121.67451,435.57074,185.83725Q444.0754,250,410.95278,296.31131Z;M460.19079,314.81752Q429.48296,379.63503,366.74655,397.33779Q304.01014,415.04055,238.62673,450.6401Q173.24331,486.23965,141.80231,418.853Q110.3613,351.46635,87.51337,300.73317Q64.66545,250,86.56406,198.80231Q108.46268,147.60462,149.75669,107.39355Q191.05069,67.18248,258.9189,40.41566Q326.7871,13.64883,381.21107,64.45621Q435.63503,115.26359,463.26683,182.63179Q490.89862,250,460.19079,314.81752Z;M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z;M437.48517,301.93698Q392.82947,353.87396,357.50371,413.21131Q322.17795,472.54867,247.51112,479.51159Q172.8443,486.47452,129.54819,427.64458Q86.25209,368.81464,81.57785,309.40732Q76.90361,250,83.86283,191.93327Q90.82205,133.86654,141.98146,104.152Q193.14087,74.43745,247.01483,83.88926Q300.88878,93.34106,355.51112,113.62234Q410.13346,133.90361,446.13717,191.95181Q482.14087,250,437.48517,301.93698Z;M423.38828,307.00416Q406.39243,364.00831,353.55217,384.57202Q300.71191,405.13573,242.06787,430.50416Q183.42382,455.87258,116.5554,425.63666Q49.68697,395.40075,58.87581,322.70037Q68.06464,250,86.66067,197.31625Q105.2567,144.63251,148.86843,108.53648Q192.48015,72.44045,252.10019,66.13989Q311.72022,59.83933,378.54063,84.21929Q445.36105,108.59925,442.87258,179.29963Q440.38412,250,423.38828,307.00416Z;M410.95278,296.31131Q377.83016,342.62262,346.59668,396.40799Q315.3632,450.19336,253.66275,438.70512Q191.9623,427.21687,143.72172,394.79004Q95.48115,362.3632,86.24057,306.1816Q77,250,74.51885,185.3632Q72.0377,120.72639,123.0377,68.91975Q174.0377,17.1131,239.88914,47.47163Q305.74057,77.83016,366.40332,99.75233Q427.06607,121.67451,435.57074,185.83725Q444.0754,250,410.95278,296.31131Z"
            ></animate>
          </path>
        </svg>

        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="60%"
          id="blobSvg2"
          style={{ opacity: 1 }}
          filter="blur(0px)"
          transform="rotate(172)"
        >
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#59a6fe" }}></stop>
              <stop offset="100%" style={{ stopColor: "#b4f556" }}></stop>
            </linearGradient>
          </defs>
          <path id="blob" fill="url(#gradient2)" style={{ opacity: 0.9 }}>
            <animate
              attributeName="d"
              dur="24900ms"
              repeatCount="indefinite"
              values="M403.5,294Q372,338,343,393Q314,448,254,435.5Q194,423,138,397.5Q82,372,88,311Q94,250,86,187.5Q78,125,134,95.5Q190,66,253,57Q316,48,362,91.5Q408,135,421.5,192.5Q435,250,403.5,294Z;M460.19079,314.81752Q429.48296,379.63503,366.74655,397.33779Q304.01014,415.04055,238.62673,450.6401Q173.24331,486.23965,141.80231,418.853Q110.3613,351.46635,87.51337,300.73317Q64.66545,250,86.56406,198.80231Q108.46268,147.60462,149.75669,107.39355Q191.05069,67.18248,258.9189,40.41566Q326.7871,13.64883,381.21107,64.45621Q435.63503,115.26359,463.26683,182.63179Q490.89862,250,460.19079,314.81752Z;M424.84079,321.86371Q447.86386,393.72743,384.56836,431.15935Q321.27286,468.59128,248.86371,472.84107Q176.45457,477.09086,148.84107,410.1135Q121.22757,343.13614,67.95457,296.56807Q14.68157,250,76.45485,209.5685Q138.22813,169.13699,166.2505,123.59142Q194.27286,78.04585,249.70464,79.81828Q305.13643,81.59072,362.47721,103.93179Q419.818,126.27286,410.81786,188.13643Q401.81772,250,424.84079,321.86371Z;M437.48517,301.93698Q392.82947,353.87396,357.50371,413.21131Q322.17795,472.54867,247.51112,479.51159Q172.8443,486.47452,129.54819,427.64458Q86.25209,368.81464,81.57785,309.40732Q76.90361,250,83.86283,191.93327Q90.82205,133.86654,141.98146,104.152Q193.14087,74.43745,247.01483,83.88926Q300.88878,93.34106,355.51112,113.62234Q410.13346,133.90361,446.13717,191.95181Q482.14087,250,437.48517,301.93698Z;M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z;M410.95278,296.31131Q377.83016,342.62262,346.59668,396.40799Q315.3632,450.19336,253.66275,438.70512Q191.9623,427.21687,143.72172,394.79004Q95.48115,362.3632,86.24057,306.1816Q77,250,74.51885,185.3632Q72.0377,120.72639,123.0377,68.91975Q174.0377,17.1131,239.88914,47.47163Q305.74057,77.83016,366.40332,99.75233Q427.06607,121.67451,435.57074,185.83725Q444.0754,250,410.95278,296.31131Z;M469.34657,320.38487Q443.8468,390.76973,373.53877,402.1156Q303.23073,413.46147,238.88463,448.30757Q174.53853,483.15367,122.76833,431.6929Q70.99814,380.23213,76.84563,315.11607Q82.69313,250,78.9227,186.3071Q75.15227,122.6142,131.92223,91.73003Q188.6922,60.84587,253.2305,51.539Q317.7688,42.23213,359.5759,90.92433Q401.383,139.61653,448.11467,194.80827Q494.84633,250,469.34657,320.38487Z;M403.5,294Q372,338,343,393Q314,448,254,435.5Q194,423,138,397.5Q82,372,88,311Q94,250,86,187.5Q78,125,134,95.5Q190,66,253,57Q316,48,362,91.5Q408,135,421.5,192.5Q435,250,403.5,294Z"
            ></animate>
          </path>
        </svg>

        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="70%"
          id="blobSvg3"
          style={{ opacity: 1 }}
          filter="blur(0px)"
          transform="rotate(201)"
        >
          <defs>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#e44bed" }}></stop>
              <stop offset="100%" style={{ stopColor: "#f08d3d" }}></stop>
            </linearGradient>
          </defs>
          <path id="blob" fill="url(#gradient3)" style={{ opacity: 0.9 }}>
            <animate
              attributeName="d"
              dur="24s"
              repeatCount="indefinite"
              values="M394.89432,291.86359Q379.96349,333.72718,354.5999,379.04899Q329.23631,424.37079,274.96542,439.22911Q220.69452,454.08742,185.59462,409.0927Q150.49472,364.09798,125.7075,328.96349Q100.92028,293.82901,59.42363,237.80355Q17.92698,181.77809,66.30163,137.5999Q114.67627,93.42171,168.36359,75.4145Q222.05091,57.4073,282.76369,51.5999Q343.47647,45.7925,374.93276,97.57444Q406.38905,149.35639,408.1071,199.67819Q409.82516,250,394.89432,291.86359Z;M415.01911,310.8863Q439.5452,371.7726,388.0904,405.2945Q336.6356,438.8164,280.7726,433.452Q224.9096,428.08761,185.95759,398.74511Q147.00559,369.40261,129.05219,330.15471Q111.09878,290.9068,102.89189,247.863Q94.68499,204.8192,97.4315,140.3164Q100.17801,75.81361,160.4068,60.51771Q220.6356,45.22181,275.226,60.1356Q329.8164,75.04939,372.9534,109.3658Q416.0904,143.6822,403.29171,196.8411Q390.49301,250,415.01911,310.8863Z;M440.79254,295.90011Q393.21514,341.80021,357.53347,375.20746Q321.85181,408.61471,271.82218,427.01866Q221.79254,445.4226,171.55544,422.09659Q121.31834,398.77057,68.79254,358.84083Q16.26674,318.91109,38.15202,256.60373Q60.03731,194.29637,79.65586,134.88912Q99.27441,75.48187,157.19648,42.12622Q215.11855,8.77057,268.67782,50.11855Q322.2371,91.46653,362.16684,121.87761Q402.09659,152.2887,445.23326,201.14435Q488.36994,250,440.79254,295.90011Z;M430.80624,308.72934Q432.1339,367.45868,372.72647,377.66948Q313.31905,387.88027,263.72647,442.80911Q214.1339,497.73795,154.61821,463.08837Q95.10253,428.43879,60.15953,372.16526Q25.21653,315.89174,60.3661,260.16239Q95.51568,204.43305,120.04418,166.21939Q144.57268,128.00574,181.94874,82.19376Q219.32479,36.38179,273.74216,57.19376Q328.15953,78.00574,384.05413,102.85329Q439.94874,127.70084,434.71366,188.85042Q429.47858,250,430.80624,308.72934Z;M456.0768,303.76136Q418.13543,357.52271,379.98225,404.29316Q341.82907,451.0636,284.01817,433.65772Q226.20727,416.25185,163.99091,418.54046Q101.77456,420.82907,62.72047,368.86953Q23.66638,316.90999,61.99091,261.65772Q100.31545,206.40545,118.97771,163.62635Q137.63998,120.84725,179.51817,86.26136Q221.39637,51.67547,267.19818,81.83773Q313,112,367.68455,125.86045Q422.36911,139.7209,458.19364,194.86045Q494.01817,250,456.0768,303.76136Z;M437.20545,311.82292Q441.89352,373.64584,380.77431,387.66608Q319.65509,401.68633,271.82754,416.34317Q224,431,184.22569,401.27431Q144.45139,371.54861,81.45601,344.74769Q18.46064,317.94676,58.87153,261.64584Q99.28242,205.34491,102.46413,144.38253Q105.64584,83.42014,164.05961,69.5926Q222.47338,55.76506,274.24769,69.97338Q326.02199,84.18171,376.989,109.95139Q427.95601,135.72107,430.23669,192.86053Q432.51737,250,437.20545,311.82292Z;M463.5,311.5Q441,373,396,422Q351,471,287,455Q223,439,179,411Q135,383,79,350Q23,317,51.5,258.5Q80,200,94,143.5Q108,87,162,49.5Q216,12,281.5,24.5Q347,37,383.5,89Q420,141,453,195.5Q486,250,463.5,311.5Z;M409,303.5Q416,357,378,402Q340,447,282,439Q224,431,187,398.5Q150,366,105.5,335.5Q61,305,45,245Q29,185,59,124.5Q89,64,152.5,40Q216,16,265,63.5Q314,111,383,115.5Q452,120,427,185Q402,250,409,303.5Z;M440.89145,308.17188Q431.49014,366.34375,386.51892,408.54441Q341.5477,450.74507,280.86143,454.67188Q220.17516,458.59868,161.4046,439.6065Q102.63404,420.61431,74.24712,365.23068Q45.86019,309.84704,51.25164,251.37253Q56.64309,192.89803,94.98232,154.25946Q133.32155,115.62089,180.13528,103.21957Q226.94901,90.81826,286.5366,64.96012Q346.12418,39.10197,382.33594,90.33923Q418.5477,141.57648,434.42023,195.78824Q450.29277,250,440.89145,308.17188Z;M432.03478,297.56957Q398.46218,345.13914,356.36479,367.83696Q314.26739,390.53478,267.26739,423.085Q220.26739,455.63521,175.78826,421.28282Q131.30913,386.93043,88.83152,348.48609Q46.35391,310.04174,68.21174,256.28131Q90.06957,202.52087,95.17544,139.65457Q100.28131,76.78826,162.38717,74.23956Q224.49304,71.69087,270.52087,88.04326Q316.5487,104.39565,381.35239,113.97913Q446.15608,123.56261,455.88173,186.78131Q465.60739,250,432.03478,297.56957Z;M394.89432,291.86359Q379.96349,333.72718,354.5999,379.04899Q329.23631,424.37079,274.96542,439.22911Q220.69452,454.08742,185.59462,409.0927Q150.49472,364.09798,125.7075,328.96349Q100.92028,293.82901,59.42363,237.80355Q17.92698,181.77809,66.30163,137.5999Q114.67627,93.42171,168.36359,75.4145Q222.05091,57.4073,282.76369,51.5999Q343.47647,45.7925,374.93276,97.57444Q406.38905,149.35639,408.1071,199.67819Q409.82516,250,394.89432,291.86359Z"
            ></animate>
          </path>
        </svg>
      </div>
    </div>
  );
}

export default App;