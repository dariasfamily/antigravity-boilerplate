import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                axon: {
                    dark: "#0a0a0a",
                    neon: "#00f0ff",
                    purple: "#bd00ff",
                    gold: "#ffd700",
                    danger: "#ff003c",
                },
            },
        },
    },
    plugins: [],
};
export default config;
