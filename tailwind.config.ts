
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				we: {
					black: '#000000',
					white: '#FCFBF8', // Blanc cassé
					gold: '#D4BC8A', // Or doux
					beige: '#F2EBE3', // Beige doux
					green: '#7D9D8C', // Vert eucalyptus
					gray: {
						100: '#F9F8F6',
						200: '#F2F0ED',
						300: '#E8E5E1',
						400: '#D1CDC8',
						500: '#AAA6A1',
						600: '#837F7A',
						700: '#5F5C58',
						800: '#3B3936',
						900: '#1A1918',
					}
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Add vip colors
				vip: {
					gold: '#D4BC8A',
					black: '#000000',
					white: '#FFFFFF',
					gray: {
						100: '#F9F8F6',
						200: '#F2F0ED',
						300: '#E8E5E1',
						400: '#D1CDC8',
						500: '#AAA6A1',
						600: '#837F7A',
						700: '#5F5C58',
						800: '#3B3936',
						900: '#1A1918',
					}
				}
			},
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
				display: ['Playfair Display', 'serif'],
				body: ['Poppins', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				},
				'shimmer': {
					'100%': {
						transform: 'translateX(100%)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'shimmer': 'shimmer 2s infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
