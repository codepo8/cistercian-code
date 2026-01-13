function Cistercian() {
    this.config = {
        canvas: {
            width: 120,
        },
        stroke: {
            colour: '#000',
            width: 4,
            cap: 'square'
        },
        renderer: 'canvas',
        addtext: true,
        addinteraction: true,
        outputcontainer: document.querySelector('output')
    };
    if (this.config.outputcontainer === null) {
        this.config.outputcontainer = document.createElement('output');
        document.body.appendChild(this.config.outputcontainer);
    }
    this.configure = function(options) {
        this.config = { ...this.config, ...options };
    };
    this.points = [
        [10,10],[30,10],[50,10],
        [10,30],[30,30],[50,30],
        [10,50],[30,50],[50,50],
        [10,60],[30,60],[50,60],
        [10,80],[30,80],[50,80]
    ];

    this.glyphs = {
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

    this.drawline = function(x, y, x1, y1, cx) {
        if (this.config.renderer === 'canvas') {
            cx.beginPath();
            cx.moveTo(x, y);
            cx.lineTo(x1, y1);
            cx.stroke();
            cx.closePath();
        }
        if (this.config.renderer === 'svg') {
            return `<line x1="${x}" y1="${y}" x2="${x1}" y2="${y1}" 
            stroke="${this.config.stroke.colour}" stroke-linecap="square" stroke-width="${this.config.stroke.width}"/>`;
        }
    };
    this.addcanvas = function() {
        let canvascontainer = document.createElement('div');
        let p = document.createElement('p');
        if (this.config.renderer === 'svg') {
            let svgcontent = `<a href=""><svg width="${this.config.canvas.width}" height="${this.config.canvas.width * 1.5}" xmlns="http://www.w3.org/2000/svg"></svg></a><p></p>`;
            canvascontainer.innerHTML = svgcontent;
            if (this.config.addinteraction) {
                let button = document.createElement('button');
                button.innerText = '❌';
                button.addEventListener('click', () => { canvascontainer.remove();});
                canvascontainer.appendChild(button);
            }
        }
        if (this.config.renderer === 'canvas') {
            let downloadlink = document.createElement('a');
            let canvas = document.createElement('canvas');
            let cx = canvas.getContext('2d');
            canvas.width = this.config.canvas.width;
            canvas.height = this.config.canvas.width * 1.5;
            cx.strokeStyle = this.config.stroke.style;
            cx.lineWidth = this.config.stroke.width;
            cx.lineCap = this.config.stroke.cap;
            if (this.config.addinteraction) {
                let button = document.createElement('button');
                button.innerText = '❌';
                button.addEventListener('click', () => { canvascontainer.remove(); });
                canvascontainer.appendChild(downloadlink);
                downloadlink.appendChild(canvas);
                if (this.config.addtext) { canvascontainer.appendChild(p); }
                canvascontainer.appendChild(button);
            } else {
                canvascontainer.appendChild(canvas);
                if (this.config.addtext) { canvascontainer.appendChild(p);}
            }
        }
        this.config.outputcontainer.appendChild(canvascontainer);
        return canvascontainer;
    };

    this.rendernumber = function(number) {
        if (number < 0 || number > 9999) return;
        this.factor = this.config.canvas.width / 60;
        if (this.config.renderer === 'svg') {
            let rendercontainer = this.addcanvas();
            let textbox = rendercontainer.querySelector('p');
            let svg = rendercontainer.querySelector('svg');
            svg.innerHTML = `<title>Cistercian numeral for ${number}</title>`;
            if (this.glyphs[number]) {
                this.glyphs[number].forEach(glyph => {
                    line = this.drawline(
                            this.points[glyph[0]][0] * this.factor, this.points[glyph[0]][1] * this.factor,
                            this.points[glyph[1]][0] * this.factor, this.points[glyph[1]][1] * this.factor
                        )
                    svg.innerHTML += line;
                });
            } else {
                let chunks = number.toString().split('').reverse();
                chunks.forEach((chunk, index) => {
                    let value = chunk + '0'.repeat(index);
                    if (this.glyphs[value]) {
                        this.glyphs[value].forEach(glyph => {
                            line = this.drawline(
                                this.points[glyph[0]][0] * this.factor, this.points[glyph[0]][1] * this.factor,
                                this.points[glyph[1]][0] * this.factor, this.points[glyph[1]][1] * this.factor)
                                svg.innerHTML += line;
                            });
                        }
                    });
                }
            if (this.config.addtext) {
                textbox.innerText = number;
            }
            if (this.config.addinteraction) {
                downloadlink = rendercontainer.querySelector('a');
                downloadlink.href = `data:image/svg+xml,${encodeURIComponent(svg.outerHTML)}`;
                downloadlink.download = 'cistercian_' + number + '.svg';
            }        
    }
        if (this.config.renderer === 'canvas') {
            let rendercontainer = this.addcanvas();
            let textbox = rendercontainer.querySelector('p');
            let downloadlink = rendercontainer.querySelector('a');
            let cx = rendercontainer.querySelector('canvas').getContext('2d');
            if (this.glyphs[number]) {
                this.glyphs[number].forEach(glyph => {
                    this.drawline(
                        this.points[glyph[0]][0] * this.factor, this.points[glyph[0]][1] * this.factor,
                        this.points[glyph[1]][0] * this.factor, this.points[glyph[1]][1] * this.factor 
                    ,cx)
                });
             } else {
                let chunks = number.toString().split('').reverse();
                chunks.forEach((chunk, index) => {
                    let value = chunk + '0'.repeat(index);
                    if (this.glyphs[value]) {
                        this.glyphs[value].forEach(glyph => {
                            this.drawline(
                                this.points[glyph[0]][0] * this.factor, this.points[glyph[0]][1] * this.factor,
                                this.points[glyph[1]][0] * this.factor, this.points[glyph[1]][1] * this.factor 
                                ,cx)
                            });
                        }
                });
            }
            if (this.config.addtext) { textbox.innerText = number; }
            if (this.config.addinteraction) {
                downloadlink.href = rendercontainer.querySelector('canvas').toDataURL();
                downloadlink.download = 'cistercian_' + number + '.png';
            }        

        };
     }
}