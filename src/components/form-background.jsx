// src/components/form-background.jsx
export function FormBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full opacity-30 blur-[0.3px] pointer-events-none z-0 flex justify-center items-center">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grid Pattern */}
        <defs>
          <pattern
            id="grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-muted-foreground/40"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />{" "}
        {/* Large Form Elements for Better Visibility */}
        <g className="text-primary/60">
          {/* Large Form Container 1 - Top Left */}
          <rect
            x="50"
            y="50"
            width="320"
            height="220"
            rx="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <rect
            x="70"
            y="80"
            width="280"
            height="15"
            rx="7"
            fill="currentColor"
          />
          <rect
            x="70"
            y="110"
            width="280"
            height="20"
            rx="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="70"
            y="145"
            width="280"
            height="20"
            rx="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="70"
            y="180"
            width="200"
            height="30"
            rx="15"
            fill="currentColor"
          />

          {/* Large Form Container 2 - Bottom Right */}
          <rect
            x="1400"
            y="750"
            width="320"
            height="200"
            rx="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <rect
            x="1420"
            y="780"
            width="280"
            height="12"
            rx="6"
            fill="currentColor"
          />
          <rect
            x="1420"
            y="805"
            width="280"
            height="18"
            rx="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="1420"
            y="835"
            width="280"
            height="18"
            rx="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="1420"
            y="865"
            width="180"
            height="25"
            rx="12"
            fill="currentColor"
          />

          {/* Large Form Container 3 - Top Right */}
          <rect
            x="1450"
            y="80"
            width="350"
            height="250"
            rx="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <rect
            x="1470"
            y="110"
            width="310"
            height="18"
            rx="9"
            fill="currentColor"
          />
          <rect
            x="1470"
            y="140"
            width="310"
            height="22"
            rx="11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="1470"
            y="175"
            width="310"
            height="22"
            rx="11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="1470"
            y="210"
            width="220"
            height="35"
            rx="17"
            fill="currentColor"
          />

          {/* Large Form Container 4 - Bottom Left */}
          <rect
            x="80"
            y="750"
            width="300"
            height="180"
            rx="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <rect
            x="100"
            y="780"
            width="260"
            height="15"
            rx="7"
            fill="currentColor"
          />
          <rect
            x="100"
            y="810"
            width="260"
            height="20"
            rx="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="100"
            y="845"
            width="260"
            height="20"
            rx="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="100"
            y="880"
            width="180"
            height="30"
            rx="15"
            fill="currentColor"
          />
        </g>{" "}
        {/* Form Icons Scattered */}
        <g className="text-primary/50">
          {/* Text Input Icons - Distributed across screen */}
          <rect
            x="450"
            y="320"
            width="100"
            height="15"
            rx="7"
            fill="currentColor"
          />
          <rect
            x="450"
            y="345"
            width="80"
            height="15"
            rx="7"
            fill="currentColor"
          />

          <rect
            x="1200"
            y="400"
            width="90"
            height="15"
            rx="7"
            fill="currentColor"
          />
          <rect
            x="1200"
            y="425"
            width="70"
            height="15"
            rx="7"
            fill="currentColor"
          />

          <rect
            x="200"
            y="450"
            width="85"
            height="15"
            rx="7"
            fill="currentColor"
          />
          <rect
            x="200"
            y="475"
            width="65"
            height="15"
            rx="7"
            fill="currentColor"
          />

          <rect
            x="1500"
            y="500"
            width="95"
            height="15"
            rx="7"
            fill="currentColor"
          />
          <rect
            x="1500"
            y="525"
            width="75"
            height="15"
            rx="7"
            fill="currentColor"
          />

          {/* Checkbox Icons - All corners */}
          <rect
            x="600"
            y="150"
            width="20"
            height="20"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="m605 160 3 3 6-6"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />

          <rect
            x="1350"
            y="600"
            width="20"
            height="20"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="m1355 610 3 3 6-6"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />

          <rect
            x="300"
            y="850"
            width="20"
            height="20"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="m305 860 3 3 6-6"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />

          <rect
            x="1650"
            y="450"
            width="20"
            height="20"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="m1655 460 3 3 6-6"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />

          {/* Button Icons - Spread out */}
          <rect
            x="800"
            y="200"
            width="100"
            height="30"
            rx="10"
            fill="currentColor"
          />
          <rect
            x="500"
            y="900"
            width="90"
            height="30"
            rx="10"
            fill="currentColor"
          />
          <rect
            x="1300"
            y="300"
            width="110"
            height="30"
            rx="10"
            fill="currentColor"
          />
          <rect
            x="150"
            y="600"
            width="85"
            height="30"
            rx="10"
            fill="currentColor"
          />

          {/* Select Dropdown Icons - Right side focus */}
          <rect
            x="1100"
            y="150"
            width="110"
            height="25"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="m1190 157 7 7 7-7"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />

          <rect
            x="1450"
            y="650"
            width="100"
            height="25"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="m1535 657 7 7 7-7"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />

          <rect
            x="400"
            y="750"
            width="100"
            height="25"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="m485 757 7 7 7-7"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />

          {/* Radio Button Groups - Multiple locations */}
          <circle
            cx="750"
            cy="450"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle cx="750" cy="450" r="5" fill="currentColor" />
          <circle
            cx="790"
            cy="450"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />

          <circle
            cx="1200"
            cy="750"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle cx="1200" cy="750" r="5" fill="currentColor" />
          <circle
            cx="1240"
            cy="750"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />

          {/* Calendar Icons - Multiple positions */}
          <rect
            x="950"
            y="100"
            width="80"
            height="70"
            rx="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <rect
            x="960"
            y="115"
            width="60"
            height="12"
            rx="3"
            fill="currentColor"
          />
          <circle cx="975" cy="140" r="3" fill="currentColor" />
          <circle cx="995" cy="140" r="3" fill="currentColor" />
          <circle cx="1015" cy="140" r="3" fill="currentColor" />
          <circle cx="975" cy="155" r="3" fill="currentColor" />
          <circle cx="995" cy="155" r="3" fill="currentColor" />

          <rect
            x="250"
            y="250"
            width="70"
            height="60"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="257"
            y="262"
            width="56"
            height="10"
            rx="2"
            fill="currentColor"
          />
          <circle cx="267" cy="285" r="2" fill="currentColor" />
          <circle cx="282" cy="285" r="2" fill="currentColor" />
          <circle cx="297" cy="285" r="2" fill="currentColor" />
          <circle cx="267" cy="295" r="2" fill="currentColor" />
          <circle cx="282" cy="295" r="2" fill="currentColor" />
        </g>{" "}
        {/* Medium Form Elements */}
        <g className="text-primary/40">
          {/* Form Container 3 - Center Left */}
          <rect
            x="600"
            y="250"
            width="250"
            height="150"
            rx="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="615"
            y="270"
            width="220"
            height="10"
            rx="5"
            fill="currentColor"
          />
          <rect
            x="615"
            y="290"
            width="220"
            height="15"
            rx="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <rect
            x="615"
            y="315"
            width="220"
            height="15"
            rx="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <rect
            x="615"
            y="340"
            width="150"
            height="20"
            rx="10"
            fill="currentColor"
          />

          {/* Form Container 4 - Center Right */}
          <rect
            x="1100"
            y="550"
            width="200"
            height="120"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="1115"
            y="570"
            width="170"
            height="8"
            rx="4"
            fill="currentColor"
          />
          <rect
            x="1115"
            y="590"
            width="170"
            height="12"
            rx="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <rect
            x="1115"
            y="610"
            width="170"
            height="12"
            rx="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <rect
            x="1115"
            y="630"
            width="120"
            height="18"
            rx="9"
            fill="currentColor"
          />

          {/* Form Container 5 - Top Center */}
          <rect
            x="750"
            y="80"
            width="220"
            height="130"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="765"
            y="100"
            width="190"
            height="8"
            rx="4"
            fill="currentColor"
          />
          <rect
            x="765"
            y="120"
            width="190"
            height="12"
            rx="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <rect
            x="765"
            y="140"
            width="190"
            height="12"
            rx="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <rect
            x="765"
            y="160"
            width="130"
            height="18"
            rx="9"
            fill="currentColor"
          />

          {/* Additional Elements - Right side focus */}
          <rect
            x="1350"
            y="400"
            width="80"
            height="12"
            rx="6"
            fill="currentColor"
          />
          <rect
            x="1350"
            y="420"
            width="60"
            height="12"
            rx="6"
            fill="currentColor"
          />

          <rect
            x="1250"
            y="200"
            width="70"
            height="20"
            rx="8"
            fill="currentColor"
          />
          <rect
            x="1550"
            y="750"
            width="90"
            height="20"
            rx="8"
            fill="currentColor"
          />

          <rect
            x="350"
            y="400"
            width="70"
            height="20"
            rx="8"
            fill="currentColor"
          />
          <rect
            x="450"
            y="550"
            width="90"
            height="20"
            rx="8"
            fill="currentColor"
          />
        </g>{" "}
        {/* Geometric Shapes for Visual Interest */}
        <g className="text-primary/30">
          <polygon
            points="1600,100 1660,160 1600,220 1540,160"
            fill="currentColor"
          />
          <polygon
            points="250,750 310,810 250,870 190,810"
            fill="currentColor"
          />
          <polygon
            points="1400,500 1460,560 1400,620 1340,560"
            fill="currentColor"
          />
          <polygon
            points="500,150 560,210 500,270 440,210"
            fill="currentColor"
          />

          <rect
            x="1200"
            y="300"
            width="40"
            height="40"
            rx="20"
            fill="currentColor"
            transform="rotate(45 1220 320)"
          />
          <rect
            x="400"
            y="800"
            width="35"
            height="35"
            rx="17"
            fill="currentColor"
            transform="rotate(45 417 817)"
          />
          <rect
            x="1500"
            y="350"
            width="45"
            height="45"
            rx="22"
            fill="currentColor"
            transform="rotate(45 1522 372)"
          />

          <circle cx="850" cy="600" r="15" fill="currentColor" />
          <circle cx="1350" cy="150" r="20" fill="currentColor" />
          <circle cx="300" cy="350" r="12" fill="currentColor" />
          <circle cx="1550" cy="400" r="18" fill="currentColor" />
          <circle cx="650" cy="800" r="16" fill="currentColor" />
          <circle cx="1650" cy="750" r="14" fill="currentColor" />
        </g>
        {/* Small Scattered Elements */}
        <g className="text-primary/35">
          {/* Left side dots */}
          <circle cx="180" cy="180" r="4" fill="currentColor" />
          <circle cx="320" cy="280" r="4" fill="currentColor" />
          <circle cx="120" cy="380" r="4" fill="currentColor" />
          <circle cx="280" cy="480" r="4" fill="currentColor" />
          <circle cx="150" cy="580" r="4" fill="currentColor" />
          <circle cx="350" cy="680" r="4" fill="currentColor" />

          {/* Right side dots */}
          <circle cx="1280" cy="120" r="4" fill="currentColor" />
          <circle cx="1420" cy="220" r="4" fill="currentColor" />
          <circle cx="1320" cy="320" r="4" fill="currentColor" />
          <circle cx="1580" cy="280" r="4" fill="currentColor" />
          <circle cx="1480" cy="580" r="4" fill="currentColor" />
          <circle cx="1620" cy="680" r="4" fill="currentColor" />
          <circle cx="1380" cy="780" r="4" fill="currentColor" />
          <circle cx="1520" cy="880" r="4" fill="currentColor" />

          {/* Center area dots */}
          <circle cx="680" cy="180" r="4" fill="currentColor" />
          <circle cx="880" cy="280" r="4" fill="currentColor" />
          <circle cx="780" cy="380" r="4" fill="currentColor" />
          <circle cx="980" cy="480" r="4" fill="currentColor" />
          <circle cx="820" cy="780" r="4" fill="currentColor" />

          {/* Left side lines */}
          <rect
            x="200"
            y="150"
            width="30"
            height="4"
            rx="2"
            fill="currentColor"
          />
          <rect
            x="300"
            y="250"
            width="25"
            height="4"
            rx="2"
            fill="currentColor"
          />
          <rect
            x="100"
            y="400"
            width="35"
            height="4"
            rx="2"
            fill="currentColor"
          />
          <rect
            x="250"
            y="550"
            width="40"
            height="4"
            rx="2"
            fill="currentColor"
          />

          {/* Right side lines */}
          <rect
            x="1300"
            y="180"
            width="35"
            height="4"
            rx="2"
            fill="currentColor"
          />
          <rect
            x="1450"
            y="280"
            width="30"
            height="4"
            rx="2"
            fill="currentColor"
          />
          <rect
            x="1350"
            y="480"
            width="40"
            height="4"
            rx="2"
            fill="currentColor"
          />
          <rect
            x="1500"
            y="680"
            width="45"
            height="4"
            rx="2"
            fill="currentColor"
          />
          <rect
            x="1250"
            y="850"
            width="38"
            height="4"
            rx="2"
            fill="currentColor"
          />

          {/* Center area lines */}
          <rect
            x="700"
            y="250"
            width="32"
            height="4"
            rx="2"
            fill="currentColor"
          />
          <rect
            x="850"
            y="350"
            width="28"
            height="4"
            rx="2"
            fill="currentColor"
          />
          <rect
            x="750"
            y="650"
            width="36"
            height="4"
            rx="2"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  );
}
