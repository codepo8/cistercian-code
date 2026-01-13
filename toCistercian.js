    let config = {
        canvas: { width: 120 },
        stroke: { colour: '#000', width: 4, cap: 'square' }
    };
    const configure = (options) => {
        config = { ...config, ...options };
    };
    const points = [
        [10,10],[30,10],[50,10],
        [10,30],[30,30],[50,30],
        [10,50],[30,50],[50,50],
        [10,60],[30,60],[50,60],
        [10,80],[30,80],[50,80]
    ];
    const glyphs = {
        0: [[1,13]],
        1: [[1,13],[1,2]], 10: [[1,13],[0,1]], 100: [[1,13],[14,13]], 1000: [[1,13],[12,13]],
        2: [[1,13],[4,5]], 20: [[1,13],[3,4]], 200: [[1,13],[10,11]], 2000: [[1,13],[9,10]],
        3: [[1,13],[1,5]], 30: [[1,13],[1,3]], 300: [[1,13],[13,11]], 3000: [[1,13],[13,9]],
        4: [[1,13],[4,2]], 40: [[1,13],[4,0]], 400: [[1,13],[10,14]], 4000: [[1,13],[10,12]], 
        5: [[1,13],[1,2],[2,4]], 50: [[1,13],[0,1],[0,4]], 500: [[1,13],[13,14],[14,10]], 
        5000: [[1,13],[13,12],[12,10]],
        6: [[1,13],[2,5]], 60: [[1,13],[0,3]], 600: [[1,13],[14,11]], 6000: [[1,13],[12,9]],
        7: [[1,13],[1,2],[2,5]], 70: [[1,13],[0,1],[0,3]], 700: [[1,13],[13,14],[14,11]], 
        7000: [[1,13],[13,12],[12,9]],
        8: [[1,13],[4,5],[5,2]], 80: [[1,13],[4,3],[3,0]], 800: [[1,13],[10,11],[11,14]], 
        8000: [[1,13],[12,9],[9,10]],
        9: [[1,13],[1,2],[2,5],[5,4]], 90: [[1,13],[0,1],[0,3],[3,4]], 900: [[1,13],[13,14],[14,11],[11,10]], 
        9000: [[1,13],[13,12],[12,9],[9,10]]
    };
    const drawline = (x, y, x1, y1) => {
        return `<line x1="${x}" y1="${y}" x2="${x1}" y2="${y1}" 
        stroke="${config.stroke.colour}" stroke-linecap="square" stroke-width="${config.stroke.width}"/>`;
    };
    const toCistercian = (number) => {
        let svg = `<svg width="${config.canvas.width}" height="${config.canvas.width * 1.5}" xmlns="http://www.w3.org/2000/svg"><title>Cistercian numeral for ${number}</title>`;
        if (number < 0 || number > 9999) return;
        let factor = config.canvas.width / 60;
        if (glyphs[number]) {
            glyphs[number].forEach(glyph => {
                let line = drawline(
                    points[glyph[0]][0] * factor, points[glyph[0]][1] * factor,
                    points[glyph[1]][0] * factor, points[glyph[1]][1] * factor
                )
                svg += line;
            });
        } else {
            let chunks = number.toString().split('').reverse();
            chunks.forEach((chunk, index) => {
                let value = chunk + '0'.repeat(index);
                if (glyphs[value]) {
                    glyphs[value].forEach(glyph => {
                        let line = drawline(
                            points[glyph[0]][0] * factor, points[glyph[0]][1] * factor,
                            points[glyph[1]][0] * factor, points[glyph[1]][1] * factor
                        )
                        svg += line;
                    });
                }
            });
        }
        svg += `</svg>`;
        return svg;
    };

    // expose API for CommonJS, ESM and browser, plus a tiny CLI
    const api = { configure, toCistercian };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
        module.exports.default = api;
    }

    try {
        if (typeof window !== 'undefined') {
            window.toCistercian = api;
        }
    } catch (e) { /* ignore when not in browser */ }

    // simple CLI: node toCistercian.js <number>
    if (typeof require !== 'undefined' && require.main === module) {
        const [,, arg] = process.argv;
        const n = parseInt(arg, 10);
        if (!arg || Number.isNaN(n)) {
            console.error('Usage: node toCistercian.js <number>');
            process.exit(1);
        }
        const svg = rendernumber(n);
        if (!svg) {
            console.error('Number must be between 1 and 9999');
            process.exit(1);
        }
        process.stdout.write(svg);
    }