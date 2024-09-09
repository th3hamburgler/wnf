/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
			'blue': {
				'50':  '#e8f9ff',
				'100': '#cceeff',
				'200': '#99ddff',
				'300': '#66ccff',
				'400': '#33bbff',
				'500': '#00aaff',
				'600': '#0088e6',
				'700': '#006bb3',
				'800': '#005299',
				'900': '#06213e',   // this one
				'950': '#03101F',  
			},
			'wheat': {
				'50': '#fbf9ef',
				'100': '#efe5c3', // this one
				'200': '#e6d6a1',
				'300': '#d9bd70',
				'400': '#d0a84f',
				'500': '#c68e3a',
				'600': '#af7130',
				'700': '#92552b',
				'800': '#784428',
				'900': '#633924',
				'950': '#381d10',
			},
			'green': {
				'50': '#f3faf3',
				'100': '#e3f5e3',
				'200': '#c8eac9',
				'300': '#9dd89f',
				'400': '#6bbd6e',
				'500': '#4caf50', // this one
				'600': '#358438',
				'700': '#2d6830',
				'800': '#275429',
				'900': '#224525',
				'950': '#0e2510',
			},
			'red': {
				'50': '#fef3f2',
				'100': '#ffe3e1',
				'200': '#ffccc8',
				'300': '#ffa8a2',
				'400': '#fc776d',
				'500': '#f44336', // this one
				'600': '#e22d20',
				'700': '#be2217',
				'800': '#9d2017',
				'900': '#82211a',
				'950': '#470c08',
			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  dropShadow: {
			glow: [
			  "0 0px 20px rgba(255,255,255, 0.35)",
			  "0 0px 65px rgba(255,255,255, 0.2)"
			]
		  },
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
			'spin-slow': 'spin 20s linear infinite',
		  },
  	}
  },
  plugins: [require("tailwindcss-animate")],
}