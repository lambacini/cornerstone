/*! cornerstone - v0.10.4 - 2017-04-05 | (c) 2014 Chris Hafey | https://github.com/chafey/cornerstone */
if (typeof cornerstone === 'undefined') {
    cornerstone = {
        internal: {},
        rendering: {},
        colors: {}
    };
}

(function (cornerstone) {

    "use strict";

    /**
     * Converts a point in the canvas coordinate system to the pixel coordinate system
     * system.  This can be used to reset tools' image coordinates after modifications
     * have been made in canvas space (e.g. moving a tool by a few cm, independent of 
     * image resolution).
     *
     * @param element
     * @param pt
     * @returns {x: number, y: number}
     */
    function canvasToPixel(element, pt) {
        var enabledElement = cornerstone.getEnabledElement(element);
        var transform = cornerstone.internal.getTransform(enabledElement);
        transform.invert();
        return transform.transformPoint(pt.x, pt.y);
    }

    // module/private exports
    cornerstone.canvasToPixel = canvasToPixel;

}(cornerstone));

(function (cornerstone) {

    var COLOR_BLACK = [0, 0, 0, 255];

    // Colormaps
    // 
    // All Linear Segmented Colormaps were copied from matplotlib
    // https://github.com/stefanv/matplotlib/blob/master/lib/matplotlib/_cm.py

    var colormapsData = {
        gray: {
            name: 'Gray',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 0, 0],
                    [1, 1, 1]
                ],
                'green': [
                    [0, 0, 0],
                    [1, 1, 1]
                ],
                'blue': [
                    [0, 0, 0],
                    [1, 1, 1]
                ]
            }
        },
        jet: {
            name: 'Jet',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 0, 0],
                    [0.35, 0, 0],
                    [0.66, 1, 1],
                    [0.89, 1, 1],
                    [1, 0.5, 0.5]
                ],
                'green': [
                    [0, 0, 0],
                    [0.125, 0, 0],
                    [0.375, 1, 1],
                    [0.64, 1, 1],
                    [0.91, 0, 0],
                    [1, 0, 0]
                ],
                'blue': [
                    [0, 0.5, 0.5],
                    [0.11, 1, 1],
                    [0.34, 1, 1],
                    [0.65, 0, 0],
                    [1, 0, 0]
                ]
            }
        },
        hsv: {
            name: 'HSV',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 1, 1],
                    [0.158730, 1, 1],
                    [0.174603, 0.968750, 0.968750],
                    [0.333333, 0.031250, 0.031250],
                    [0.349206, 0, 0],
                    [0.666667, 0, 0],
                    [0.682540, 0.031250, 0.031250],
                    [0.841270, 0.968750, 0.968750],
                    [0.857143, 1, 1],
                    [1, 1, 1]
                ],
                'green': [
                    [0, 0, 0],
                    [0.158730, 0.937500, 0.937500],
                    [0.174603, 1, 1],
                    [0.507937, 1, 1],
                    [0.666667, 0.062500, 0.062500],
                    [0.682540, 0, 0],
                    [1, 0, 0]
                ],
                'blue': [
                    [0, 0, 0],
                    [0.333333, 0, 0],
                    [0.349206, 0.062500, 0.062500],
                    [0.507937, 1, 1],
                    [0.841270, 1, 1],
                    [0.857143, 0.937500, 0.937500],
                    [1, 0.09375, 0.09375]
                ]
            }
        },
        hot: {
            name: 'Hot',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 0.0416, 0.0416],
                    [0.365079, 1, 1],
                    [1, 1, 1]
                ],
                'green': [
                    [0, 0, 0],
                    [0.365079, 0, 0],
                    [0.746032, 1, 1],
                    [1, 1, 1]
                ],
                'blue': [
                    [0, 0, 0],
                    [0.746032, 0, 0],
                    [1, 1, 1]
                ]
            }
        },
        cool: {
            name: 'Cool',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 0, 0],
                    [1, 1, 1]
                ],
                'green': [
                    [0, 1, 1],
                    [1, 0, 0]
                ],
                'blue': [
                    [0, 1, 1],
                    [1, 1, 1]
                ]
            }
        },
        spring: {
            name: 'Spring',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 1, 1],
                    [1, 1, 1]
                ],
                'green': [
                    [0, 0, 0],
                    [1, 1, 1]
                ],
                'blue': [
                    [0, 1, 1],
                    [1, 0, 0]
                ]
            }
        },
        summer: {
            name: 'Summer',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 0, 0],
                    [1, 1, 1]
                ],
                'green': [
                    [0, 0.5, 0.5],
                    [1, 1, 1]
                ],
                'blue': [
                    [0, 0.4, 0.4],
                    [1, 0.4, 0.4]
                ]
            }
        },
        autumn: {
            name: 'Autumn',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 1, 1],
                    [1, 1, 1]
                ],
                'green': [
                    [0, 0, 0],
                    [1, 1, 1]
                ],
                'blue': [
                    [0, 0, 0],
                    [1, 0, 0]
                ]
            }
        },
        winter: {
            name: 'Winter',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 0, 0],
                    [1, 0, 0]
                ],
                'green': [
                    [0, 0, 0],
                    [1, 1, 1]
                ],
                'blue': [
                    [0, 1, 1],
                    [1, 0.5, 0.5]
                ]
            }
        },
        bone: {
            name: 'Bone',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 0, 0],
                    [0.746032, 0.652778, 0.652778],
                    [1, 1, 1]
                ],
                'green': [
                    [0, 0, 0],
                    [0.365079, 0.319444, 0.319444],
                    [0.746032, 0.777778, 0.777778],
                    [1, 1, 1]
                ],
                'blue': [
                    [0, 0, 0],
                    [0.365079, 0.444444, 0.444444],
                    [1, 1, 1]
                ]
            }
        },
        copper: {
            name: 'Copper',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 0, 0],
                    [0.809524, 1, 1],
                    [1, 1, 1]
                ],
                'green': [
                    [0, 0, 0],
                    [1, 0.7812, 0.7812]
                ],
                'blue': [
                    [0, 0, 0],
                    [1, 0.4975, 0.4975]
                ]
            }
        },
        spectral: {
            name: 'Spectral',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 0, 0],
                    [0.05, 0.4667, 0.4667],
                    [0.10, 0.5333, 0.5333],
                    [0.15, 0, 0],
                    [0.20, 0, 0],
                    [0.25, 0, 0],
                    [0.30, 0, 0],
                    [0.35, 0, 0],
                    [0.40, 0, 0],
                    [0.45, 0, 0],
                    [0.50, 0, 0],
                    [0.55, 0, 0],
                    [0.60, 0, 0],
                    [0.65, 0.7333, 0.7333],
                    [0.70, 0.9333, 0.9333],
                    [0.75, 1, 1],
                    [0.80, 1, 1],
                    [0.85, 1, 1],
                    [0.90, 0.8667, 0.8667],
                    [0.95, 0.80, 0.80],
                    [1, 0.80, 0.80]
                ],
                'green': [
                    [0, 0, 0],
                    [0.05, 0, 0],
                    [0.10, 0, 0],
                    [0.15, 0, 0],
                    [0.20, 0, 0],
                    [0.25, 0.4667, 0.4667],
                    [0.30, 0.6000, 0.6000],
                    [0.35, 0.6667, 0.6667],
                    [0.40, 0.6667, 0.6667],
                    [0.45, 0.6000, 0.6000],
                    [0.50, 0.7333, 0.7333],
                    [0.55, 0.8667, 0.8667],
                    [0.60, 1, 1],
                    [0.65, 1, 1],
                    [0.70, 0.9333, 0.9333],
                    [0.75, 0.8000, 0.8000],
                    [0.80, 0.6000, 0.6000],
                    [0.85, 0, 0],
                    [0.90, 0, 0],
                    [0.95, 0, 0],
                    [1, 0.80, 0.80]
                ],
                'blue': [
                    [0, 0, 0],
                    [0.05, 0.5333, 0.5333],
                    [0.10, 0.6000, 0.6000],
                    [0.15, 0.6667, 0.6667],
                    [0.20, 0.8667, 0.8667],
                    [0.25, 0.8667, 0.8667],
                    [0.30, 0.8667, 0.8667],
                    [0.35, 0.6667, 0.6667],
                    [0.40, 0.5333, 0.5333],
                    [0.45, 0, 0],
                    [0.5, 0, 0],
                    [0.55, 0, 0],
                    [0.60, 0, 0],
                    [0.65, 0, 0],
                    [0.70, 0, 0],
                    [0.75, 0, 0],
                    [0.80, 0, 0],
                    [0.85, 0, 0],
                    [0.90, 0, 0],
                    [0.95, 0, 0],
                    [1, 0.80, 0.80]
                ]
            }
        },
        coolwarm: {
            name: 'CoolWarm',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 0.2298057, 0.2298057],
                    [0.03125, 0.26623388, 0.26623388],
                    [0.0625, 0.30386891, 0.30386891],
                    [0.09375, 0.342804478, 0.342804478],
                    [0.125, 0.38301334, 0.38301334],
                    [0.15625, 0.424369608, 0.424369608],
                    [0.1875, 0.46666708, 0.46666708],
                    [0.21875, 0.509635204, 0.509635204],
                    [0.25, 0.552953156, 0.552953156],
                    [0.28125, 0.596262162, 0.596262162],
                    [0.3125, 0.639176211, 0.639176211],
                    [0.34375, 0.681291281, 0.681291281],
                    [0.375, 0.722193294, 0.722193294],
                    [0.40625, 0.761464949, 0.761464949],
                    [0.4375, 0.798691636, 0.798691636],
                    [0.46875, 0.833466556, 0.833466556],
                    [0.5, 0.865395197, 0.865395197],
                    [0.53125, 0.897787179, 0.897787179],
                    [0.5625, 0.924127593, 0.924127593],
                    [0.59375, 0.944468518, 0.944468518],
                    [0.625, 0.958852946, 0.958852946],
                    [0.65625, 0.96732803, 0.96732803],
                    [0.6875, 0.969954137, 0.969954137],
                    [0.71875, 0.966811177, 0.966811177],
                    [0.75, 0.958003065, 0.958003065],
                    [0.78125, 0.943660866, 0.943660866],
                    [0.8125, 0.923944917, 0.923944917],
                    [0.84375, 0.89904617, 0.89904617],
                    [0.875, 0.869186849, 0.869186849],
                    [0.90625, 0.834620542, 0.834620542],
                    [0.9375, 0.795631745, 0.795631745],
                    [0.96875, 0.752534934, 0.752534934],
                    [1, 0.705673158, 0.705673158]
                ],
                'green': [
                    [0, 0.298717966, 0.298717966],
                    [0.03125, 0.353094838, 0.353094838],
                    [0.0625, 0.406535296, 0.406535296],
                    [0.09375, 0.458757618, 0.458757618],
                    [0.125, 0.50941904, 0.50941904],
                    [0.15625, 0.558148092, 0.558148092],
                    [0.1875, 0.604562568, 0.604562568],
                    [0.21875, 0.648280772, 0.648280772],
                    [0.25, 0.688929332, 0.688929332],
                    [0.28125, 0.726149107, 0.726149107],
                    [0.3125, 0.759599947, 0.759599947],
                    [0.34375, 0.788964712, 0.788964712],
                    [0.375, 0.813952739, 0.813952739],
                    [0.40625, 0.834302879, 0.834302879],
                    [0.4375, 0.849786142, 0.849786142],
                    [0.46875, 0.860207984, 0.860207984],
                    [0.5, 0.86541021, 0.86541021],
                    [0.53125, 0.848937047, 0.848937047],
                    [0.5625, 0.827384882, 0.827384882],
                    [0.59375, 0.800927443, 0.800927443],
                    [0.625, 0.769767752, 0.769767752],
                    [0.65625, 0.734132809, 0.734132809],
                    [0.6875, 0.694266682, 0.694266682],
                    [0.71875, 0.650421156, 0.650421156],
                    [0.75, 0.602842431, 0.602842431],
                    [0.78125, 0.551750968, 0.551750968],
                    [0.8125, 0.49730856, 0.49730856],
                    [0.84375, 0.439559467, 0.439559467],
                    [0.875, 0.378313092, 0.378313092],
                    [0.90625, 0.312874446, 0.312874446],
                    [0.9375, 0.24128379, 0.24128379],
                    [0.96875, 0.157246067, 0.157246067],
                    [1, 0.01555616, 0.01555616]
                ],
                'blue': [
                    [0, 0.753683153, 0.753683153],
                    [0.03125, 0.801466763, 0.801466763],
                    [0.0625, 0.84495867, 0.84495867],
                    [0.09375, 0.883725899, 0.883725899],
                    [0.125, 0.917387822, 0.917387822],
                    [0.15625, 0.945619588, 0.945619588],
                    [0.1875, 0.968154911, 0.968154911],
                    [0.21875, 0.98478814, 0.98478814],
                    [0.25, 0.995375608, 0.995375608],
                    [0.28125, 0.999836203, 0.999836203],
                    [0.3125, 0.998151185, 0.998151185],
                    [0.34375, 0.990363227, 0.990363227],
                    [0.375, 0.976574709, 0.976574709],
                    [0.40625, 0.956945269, 0.956945269],
                    [0.4375, 0.931688648, 0.931688648],
                    [0.46875, 0.901068838, 0.901068838],
                    [0.5, 0.865395561, 0.865395561],
                    [0.53125, 0.820880546, 0.820880546],
                    [0.5625, 0.774508472, 0.774508472],
                    [0.59375, 0.726736146, 0.726736146],
                    [0.625, 0.678007945, 0.678007945],
                    [0.65625, 0.628751763, 0.628751763],
                    [0.6875, 0.579375448, 0.579375448],
                    [0.71875, 0.530263762, 0.530263762],
                    [0.75, 0.481775914, 0.481775914],
                    [0.78125, 0.434243684, 0.434243684],
                    [0.8125, 0.387970225, 0.387970225],
                    [0.84375, 0.343229596, 0.343229596],
                    [0.875, 0.300267182, 0.300267182],
                    [0.90625, 0.259301199, 0.259301199],
                    [0.9375, 0.220525627, 0.220525627],
                    [0.96875, 0.184115123, 0.184115123],
                    [1, 0.150232812, 0.150232812]
                ]
            }
        },
        blues: {
            name: 'Blues',
            numColors: 256,
            gamma: 1,
            segmentedData: {
                'red': [
                    [0, 0.9686274528503418, 0.9686274528503418],
                    [0.125, 0.87058824300765991, 0.87058824300765991],
                    [0.25, 0.7764706015586853, 0.7764706015586853],
                    [0.375, 0.61960786581039429, 0.61960786581039429],
                    [0.5, 0.41960784792900085, 0.41960784792900085],
                    [0.625, 0.25882354378700256, 0.25882354378700256],
                    [0.75, 0.12941177189350128, 0.12941177189350128],
                    [0.875, 0.031372550874948502, 0.031372550874948502],
                    [1, 0.031372550874948502, 0.031372550874948502]
                ],
                'green': [
                    [0, 0.9843137264251709, 0.9843137264251709],
                    [0.125, 0.92156863212585449, 0.92156863212585449],
                    [0.25, 0.85882353782653809, 0.85882353782653809],
                    [0.375, 0.7921568751335144, 0.7921568751335144],
                    [0.5, 0.68235296010971069, 0.68235296010971069],
                    [0.625, 0.57254904508590698, 0.57254904508590698],
                    [0.75, 0.44313725829124451, 0.44313725829124451],
                    [0.875, 0.31764706969261169, 0.31764706969261169],
                    [1, 0.18823529779911041, 0.18823529779911041]
                ],
                'blue': [
                    [0, 1, 1],
                    [0.125, 0.9686274528503418, 0.9686274528503418],
                    [0.25, 0.93725490570068359, 0.93725490570068359],
                    [0.375, 0.88235294818878174, 0.88235294818878174],
                    [0.5, 0.83921569585800171, 0.83921569585800171],
                    [0.625, 0.7764706015586853, 0.7764706015586853],
                    [0.75, 0.70980393886566162, 0.70980393886566162],
                    [0.875, 0.61176472902297974, 0.61176472902297974],
                    [1, 0.41960784792900085, 0.41960784792900085]
                ]
            }
        }
    }

    // Generate linearly spaced vectors
    // http://cens.ioc.ee/local/man/matlab/techdoc/ref/linspace.html
    function linspace(a, b, n) {
        n = n == null ? 100 : n;

        var increment = (b - a) / (n - 1);
        var vector = [];

        while (n-- > 0) {
            vector.push(a);
            a += increment;
        }

        // Make sure the last item will always be "b" because most of the
        // time we'll get numbers like 1.0000000000000002 instead of 1.
        vector[vector.length - 1] = b;

        return vector;
    }

    // Return the number of elements smaller than "elem" (binary search)
    function getRank(array, elem) {
        var left = 0;
        var right = array.length - 1;

        while (left <= right) {
            var mid = left + Math.floor((right - left) / 2);
            var midElem = array[mid];

            if (midElem === elem) {
                return mid;
            } else if (elem < midElem) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return left;
    }

    // Find the indices into a sorted array a such that, if the corresponding elements
    // in v were inserted before the indices, the order of a would be preserved.
    // http://lagrange.univ-lyon1.fr/docs/numpy/1.11.0/reference/generated/numpy.searchsorted.html
    function searchSorted(inputArray, values) {
        var i;
        var indexes = [];
        var len = values.length;

        inputArray.sort(function (a, b) {
            return a - b;
        });

        for (i = 0; i < len; i++) {
            indexes[i] = getRank(inputArray, values[i]);
        }

        return indexes;
    }

    // Create an *N* -element 1-d lookup table
    // 
    // *data* represented by a list of x,y0,y1 mapping correspondences. Each element in this
    // list represents how a value between 0 and 1 (inclusive) represented by x is mapped to
    // a corresponding value between 0 and 1 (inclusive). The two values of y are to allow for
    // discontinuous mapping functions (say as might be found in a sawtooth) where y0 represents
    // the value of y for values of x <= to that given, and y1 is the value to be used for x >
    // than that given). The list must start with x=0, end with x=1, and all values of x must be
    // in increasing order. Values between the given mapping points are determined by simple linear
    // interpolation.
    // 
    // The function returns an array "result" where result[x*(N-1)] gives the closest value for
    // values of x between 0 and 1.
    function makeMappingArray(N, data, gamma) {
        var i;
        var x = [];
        var y0 = [];
        var y1 = [];
        var lut = [];

        gamma = gamma == null ? 1 : gamma;

        for (i = 0; i < data.length; i++) {
            var element = data[i];

            x.push((N - 1) * element[0]);
            y0.push(element[1]);
            y1.push(element[1]);
        }

        var xLinSpace = linspace(0, 1, N);
        for (i = 0; i < N; i++) {
            xLinSpace[i] = (N - 1) * Math.pow(xLinSpace[i], gamma);
        }

        var xLinSpaceIndexes = searchSorted(x, xLinSpace);

        for (i = 1; i < N - 1; i++) {
            var index = xLinSpaceIndexes[i];
            var colorPercent = ((xLinSpace[i] - x[index - 1]) / (x[index] - x[index - 1]));
            var colorDelta = (y0[index] - y1[index - 1])

            lut[i] = colorPercent * colorDelta + y1[index - 1];
        }

        lut[0] = y1[0];
        lut[N - 1] = y0[data.length - 1];

        return lut;
    }

    // Colormap based on lookup tables using linear segments.
    // 
    // The lookup table is generated using linear interpolation for each
    // primary color, with the 0-1 domain divided into any number of
    // segments.
    //
    // https://github.com/stefanv/matplotlib/blob/3f1a23755e86fef97d51e30e106195f34425c9e3/lib/matplotlib/colors.py#L663
    function createLinearSegmentedColormap(segmentedData, N, gamma) {
        var i;
        var lut = [];

        N = N == null ? 256 : N;
        gamma = gamma == null ? 1 : gamma;

        var redLut = makeMappingArray(N, segmentedData.red, gamma);
        var greenLut = makeMappingArray(N, segmentedData.green, gamma);
        var blueLut = makeMappingArray(N, segmentedData.blue, gamma);

        for (i = 0; i < N; i++) {
            var red = Math.round(redLut[i] * 255);
            var green = Math.round(greenLut[i] * 255);
            var blue = Math.round(blueLut[i] * 255);
            var rgba = [red, green, blue, 255];

            lut.push(rgba);
        }

        return lut;
    }

    /*
     * Return all colormaps (id and name) available
     */
    function getColormapsList() {
        var colormaps = [];
        var keys = Object.keys(colormapsData);

        keys.forEach(function (key) {
            if (colormapsData.hasOwnProperty(key)) {
                var colormap = colormapsData[key];

                colormaps.push({
                    id: key,
                    name: colormap.name
                });
            }
        });

        return colormaps;
    }

    function getColormap(id, colormapData) {
        var colormap = colormapsData[id];

        if (!colormap) {
            colormap = colormapsData[id] = colormapData || {
                name: '',
                colors: []
            }
        }

        if (!colormap.colors && colormap.segmentedData) {
            colormap.colors = createLinearSegmentedColormap(colormap.segmentedData, colormap.numColors, colormap.gamma);
        }

        return {
            getColorSchemeName: function (index) {
                return colormap.name;
            },

            setColorSchemeName: function (name) {
                colormap.name = name;
            },

            getNumberOfColors: function () {
                return colormap.colors.length;
            },

            setNumberOfColors: function (numColors) {
                while (colormap.colors.length < numColors) {
                    colormap.colors.push(COLOR_BLACK);
                }

                colormap.colors.length = numColors;
            },

            getColor: function (index) {
                if (this.isValidIndex(index)) {
                    return colormap.colors[index];
                }

                return COLOR_BLACK;
            },

            getColorRepeating: function (index) {
                var numColors = colormap.colors.length;
                index = numColors ? index % numColors : 0;

                return this.getColor(index);
            },

            setColor: function (index, rgba) {
                if (this.isValidIndex(index)) {
                    colormap.colors[index] = rgba;
                }
            },

            addColor: function (rgba) {
                colormap.colors.push(rgba);
            },

            insertColor: function (index, rgba) {
                if (this.isValidIndex(index)) {
                    colormap.colors.splice(index, 0, rgba);
                }
            },

            removeColor: function (index) {
                if (this.isValidIndex(index)) {
                    colormap.colors.splice(index, 1);
                }
            },

            clearColors: function () {
                colormap.colors = [];
            },

            buildLookupTable: function (lut) {
                if (!lut) {
                    return;
                }

                var i;
                var numColors = colormap.colors.length;

                lut.setNumberOfTableValues(numColors);

                for (i = 0; i < numColors; i++) {
                    lut.setTableValue(i, colormap.colors[i]);
                }
            },

            createLookupTable: function () {
                var lut = new cornerstone.colors.LookupTable();
                this.buildLookupTable(lut);

                return lut;
            },

            isValidIndex: function (index) {
                return (index >= 0) && (index < colormap.colors.length);
            }
        }
    }

    cornerstone.colors.getColormap = getColormap;
    cornerstone.colors.getColormapsList = getColormapsList;

}(cornerstone));
(function (cornerstone) {

    "use strict";

    var BELOW_RANGE_COLOR_INDEX = 0;
    var ABOVE_RANGE_COLOR_INDEX = 1;
    var NAN_COLOR_INDEX = 2;
    var NUMBER_OF_SPECIAL_COLORS = NAN_COLOR_INDEX + 1;

    function LookupTable() {
        this.NumberOfColors = 256;
        this.Ramp = 'linear';
        this.TableRange = [0, 255];
        this.HueRange = [0, 0.66667];
        this.SaturationRange = [1, 1];
        this.ValueRange = [1, 1];
        this.AlphaRange = [1, 1];
        this.NaNColor = [128, 0, 0, 255];
        this.BelowRangeColor = [0, 0, 0, 255];
        this.UseBelowRangeColor = true;
        this.AboveRangeColor = [255, 255, 255, 255];
        this.UseAboveRangeColor = true;
        this.InputRange = [0, 255];
        this.Table = [];


        this.setNumberOfTableValues = function (number) {
            this.NumberOfColors = number;
        };

        this.setRamp = function (ramp) {
            this.Ramp = ramp;
        };

        this.setTableRange = function (start, end) {
            // Set/Get the minimum/maximum scalar values for scalar mapping.
            // Scalar values less than minimum range value are clamped to minimum range value.
            // Scalar values greater than maximum range value are clamped to maximum range value.
            this.TableRange[0] = start;
            this.TableRange[1] = end;
        };

        this.setHueRange = function (start, end) {
            // Set the range in hue (using automatic generation). Hue ranges between [0,1].
            this.HueRange[0] = start;
            this.HueRange[1] = end;
        };

        this.setSaturationRange = function (start, end) {
            // Set the range in saturation (using automatic generation). Saturation ranges between [0,1].
            this.SaturationRange[0] = start;
            this.SaturationRange[1] = end;
        };

        this.setValueRange = function (start, end) {
            // Set the range in value (using automatic generation). Value ranges between [0,1].
            this.ValueRange[0] = start;
            this.ValueRange[1] = end;
        };

        this.setRange = function (start, end) {
            this.InputRange[0] = start;
            this.InputRange[1] = end;
        };

        this.setAlphaRange = function (start, end) {
            // Set the range in alpha (using automatic generation). Alpha ranges from [0,1].
            this.AlphaRange[0] = start;
            this.AlphaRange[1] = end;
        };

        this.getColor = function (scalar) {
            // Map one value through the lookup table and return the color as an
            // RGB array of doubles between 0 and 1.

            return this.mapValue(scalar);
        };

        this.getOpacity = function () {
            return opacity;
        };

        this.HSVToRGB = function (hue, sat, val) {
            if (hue > 1) {
                throw "HSVToRGB expects hue < 1";
            }

            var rgb = [];

            if (sat === 0) {
                rgb[0] = val;
                rgb[1] = val;
                rgb[2] = val;
                return rgb;
            }

            var hueCase = Math.floor(hue * 6);
            var frac = 6 * hue - hueCase;
            var lx = val * (1 - sat);
            var ly = val * (1 - sat * frac);
            var lz = val * (1 - sat * (1 - frac));

            switch (hueCase) {
                /* 0<hue<1/6 */
                case 0:
                case 6:
                    rgb[0] = val;
                    rgb[1] = lz;
                    rgb[2] = lx;
                    break;
                    /* 1/6<hue<2/6 */
                case 1:
                    rgb[0] = ly;
                    rgb[1] = val;
                    rgb[2] = lx;
                    break;
                    /* 2/6<hue<3/6 */
                case 2:
                    rgb[0] = lx;
                    rgb[1] = val;
                    rgb[2] = lz;
                    break;
                    /* 3/6<hue/4/6 */
                case 3:
                    rgb[0] = lx;
                    rgb[1] = ly;
                    rgb[2] = val;
                    break;
                    /* 4/6<hue<5/6 */
                case 4:
                    rgb[0] = lz;
                    rgb[1] = lx;
                    rgb[2] = val;
                    break;
                    /* 5/6<hue<1 */
                case 5:
                    rgb[0] = val;
                    rgb[1] = lx;
                    rgb[2] = ly;
                    break;
            }

            return rgb;
        };

        this.build = function (force) {
            if ((this.Table.length > 1) && !force) {
                return;
            }

            // Clear the table
            this.Table = [];

            var maxIndex = this.NumberOfColors - 1;

            var hinc, sinc, vinc, ainc;
            if (maxIndex) {
                hinc = (this.HueRange[1] - this.HueRange[0]) / maxIndex;
                sinc = (this.SaturationRange[1] - this.SaturationRange[0]) / maxIndex;
                vinc = (this.ValueRange[1] - this.ValueRange[0]) / maxIndex;
                ainc = (this.AlphaRange[1] - this.AlphaRange[0]) / maxIndex;
            } else {
                hinc = sinc = vinc = ainc = 0.0;
            }

            for (var i = 0; i <= maxIndex; i++) {
                var hue = this.HueRange[0] + i * hinc;
                var sat = this.SaturationRange[0] + i * sinc;
                var val = this.ValueRange[0] + i * vinc;
                var alpha = this.AlphaRange[0] + i * ainc;

                var rgb = this.HSVToRGB(hue, sat, val);
                var c_rgba = [];

                switch (this.Ramp) {
                    case 'scurve':
                        c_rgba[0] = Math.floor(127.5 * (1.0 + Math.cos((1.0 - rgb[0]) * Math.PI)));
                        c_rgba[1] = Math.floor(127.5 * (1.0 + Math.cos((1.0 - rgb[1]) * Math.PI)));
                        c_rgba[2] = Math.floor(127.5 * (1.0 + Math.cos((1.0 - rgb[2]) * Math.PI)));
                        c_rgba[3] = Math.floor(alpha * 255);
                        break;
                    case 'linear':
                        c_rgba[0] = Math.floor(rgb[0] * 255 + 0.5);
                        c_rgba[1] = Math.floor(rgb[1] * 255 + 0.5);
                        c_rgba[2] = Math.floor(rgb[2] * 255 + 0.5);
                        c_rgba[3] = Math.floor(alpha * 255 + 0.5);
                        break;
                    case 'sqrt':
                        c_rgba[0] = Math.floor(Math.sqrt(rgb[0]) * 255 + 0.5);
                        c_rgba[1] = Math.floor(Math.sqrt(rgb[1]) * 255 + 0.5);
                        c_rgba[2] = Math.floor(Math.sqrt(rgb[2]) * 255 + 0.5);
                        c_rgba[3] = Math.floor(Math.sqrt(alpha) * 255 + 0.5);
                        break;
                    default:
                        throw new Error('Invalid Ramp value (' + this.Ramp + ')');
                }

                this.Table.push(c_rgba);
            }

            this.buildSpecialColors();
        };

        this.buildSpecialColors = function () {
            var numberOfColors = this.NumberOfColors;
            var belowRangeColorIndex = numberOfColors + BELOW_RANGE_COLOR_INDEX;
            var aboveRangeColorIndex = numberOfColors + ABOVE_RANGE_COLOR_INDEX;
            var nanColorIndex = numberOfColors + NAN_COLOR_INDEX;

            // Below range color
            if (this.UseBelowRangeColor || numberOfColors === 0) {
                this.Table[belowRangeColorIndex] = this.BelowRangeColor;
            } else {
                // Duplicate the first color in the table.
                this.Table[belowRangeColorIndex] = this.Table[0];
            }

            // Above range color
            if (this.UseAboveRangeColor || numberOfColors === 0) {
                this.Table[aboveRangeColorIndex] = this.AboveRangeColor;
            } else {
                // Duplicate the last color in the table.
                this.Table[aboveRangeColorIndex] = this.Table[numberOfColors - 1];
            }

            // Always use NanColor
            this.Table[nanColorIndex] = this.NaNColor;
        };

        // Given a scalar value v, return an rgba color value from lookup table.
        this.mapValue = function (v) {
            var index = this.getIndex(v);
            if (index < 0) {
                return this.NaNColor;
            } else if (index === 0) {
                if (this.UseBelowRangeColor && v < this.TableRange[0]) {
                    return this.BelowRangeColor;
                }
            } else if (index === this.NumberOfColors - 1) {
                if (this.UseAboveRangeColor && v > this.TableRange[1]) {
                    return this.AboveRangeColor;
                }
            }

            return this.Table[index];
        };

        this.linearIndexLookupMain = function (v, p) {
            var dIndex;

            // NOTE: Added Math.floor since values were not integers? Check VTK source
            if (v < p.Range[0]) {
                dIndex = p.MaxIndex + BELOW_RANGE_COLOR_INDEX + 1.5;
            } else if (v > p.Range[1]) {
                dIndex = p.MaxIndex + ABOVE_RANGE_COLOR_INDEX + 1.5;
            } else {
                dIndex = (v + p.Shift) * p.Scale;
            }

            return Math.round(dIndex);
        };

        this.getIndex = function (v) {
            var p = {};
            p.Range = [];
            p.MaxIndex = this.NumberOfColors - 1;

            // This was LookupShiftAndScale
            p.Shift = -this.TableRange[0];
            if (this.TableRange[1] <= this.TableRange[0]) {
                p.Scale = Number.MAX_VALUE;
            } else {
                p.Scale = p.MaxIndex / (this.TableRange[1] - this.TableRange[0]);
            }

            p.Range[0] = this.TableRange[0];
            p.Range[1] = this.TableRange[1];

            // First, check whether we have a number...
            if (isNaN(v)) {
                // For backwards compatibility
                return -1;
            }

            // Map to an index:
            var index = this.linearIndexLookupMain(v, p);

            // For backwards compatibility, if the index indicates an
            // out-of-range value, truncate to index range for in-range colors.
            if (index === this.NumberOfColors + BELOW_RANGE_COLOR_INDEX) {
                index = 0;
            } else if (index === this.NumberOfColors + ABOVE_RANGE_COLOR_INDEX) {
                index = this.NumberOfColors - 1;
            }

            return index;
        };

        this.setTableValue = function (index, rgba) {
            // Check if it index, red, green, blue and alpha were passed as parameter
            if (arguments.length === 5) {
                rgba = Array.prototype.slice.call(arguments, 1);
            }

            // Check the index to make sure it is valid
            if (index < 0) {
                throw new Error('Can\'t set the table value for negative index (' + index + ')');
            }

            if (index >= this.NumberOfColors) {
                new Error('Index ' + index + ' is greater than the number of colors ' + this.NumberOfColors);
            }

            this.Table[index] = rgba;

            if ((index === 0) || (index === this.NumberOfColors - 1)) {
                // This is needed due to the way the special colors are stored in
                // the internal table. If Above/BelowRangeColors are not used and
                // the min/max colors are changed in the table with this member
                // function, then the colors used for values outside the range may
                // be incorrect. Calling this here ensures the out-of-range colors
                // are set correctly.
                this.buildSpecialColors();
            }
        };
    }

    // module exports
    cornerstone.colors.LookupTable = LookupTable;

}(cornerstone));
(function (cornerstone) {

    "use strict";

    function disable(element) {
        if (element === undefined) {
            throw "disable: element element must not be undefined";
        }

        // Search for this element in this list of enabled elements
        var enabledElements = cornerstone.getEnabledElements();
        for (var i = 0; i < enabledElements.length; i++) {
            if (enabledElements[i].element === element) {
                // We found it!

                // Fire an event so dependencies can cleanup
                var eventData = {
                    element: element
                };
                $(element).trigger("CornerstoneElementDisabled", eventData);

                // remove the child dom elements that we created (e.g.canvas)
                enabledElements[i].element.removeChild(enabledElements[i].canvas);
                enabledElements[i].canvas = undefined;

                // remove this element from the list of enabled elements
                enabledElements.splice(i, 1);
                return;
            }
        }
    }

    // module/private exports
    cornerstone.disable = disable;

}(cornerstone));
/**
 * This module is responsible for enabling an element to display images with cornerstone
 */
(function ($, cornerstone) {

    "use strict";

    /**
     * sets a new image object for a given element
     * @param element
     * @param image
     */
    function displayImage(element, image, viewport) {
        if (element === undefined) {
            throw "displayImage: parameter element cannot be undefined";
        }
        if (image === undefined) {
            throw "displayImage: parameter image cannot be undefined";
        }

        var enabledElement = cornerstone.getEnabledElement(element);

        enabledElement.image = image;

        if (enabledElement.viewport === undefined) {
            enabledElement.viewport = cornerstone.internal.getDefaultViewport(enabledElement.canvas, image);
        }

        // merge viewport
        if (viewport) {
            for (var attrname in viewport) {
                if (viewport[attrname] !== null) {
                    enabledElement.viewport[attrname] = viewport[attrname];
                }
            }
        }

        var now = new Date();
        var frameRate;
        if (enabledElement.lastImageTimeStamp !== undefined) {
            var timeSinceLastImage = now.getTime() - enabledElement.lastImageTimeStamp;
            frameRate = (1000 / timeSinceLastImage).toFixed();
        } else {}
        enabledElement.lastImageTimeStamp = now.getTime();

        var newImageEventData = {
            viewport: enabledElement.viewport,
            element: enabledElement.element,
            image: enabledElement.image,
            enabledElement: enabledElement,
            frameRate: frameRate
        };

        $(enabledElement.element).trigger("CornerstoneNewImage", newImageEventData);

        cornerstone.updateImage(element);
    }

    // module/private exports
    cornerstone.displayImage = displayImage;
}($, cornerstone));
/**
 * This module is responsible for immediately drawing an enabled element
 */

(function ($, cornerstone) {

    "use strict";

    /**
     * Immediately draws the enabled element
     *
     * @param element
     */
    function draw(element) {
        var enabledElement = cornerstone.getEnabledElement(element);

        if (enabledElement.image === undefined) {
            throw "draw: image has not been loaded yet";
        }

        cornerstone.drawImage(enabledElement);
    }

    // Module exports
    cornerstone.draw = draw;

}($, cornerstone));
/**
 * This module is responsible for drawing invalidated enabled elements
 */

(function ($, cornerstone) {

    "use strict";

    /**
     * Draws all invalidated enabled elements and clears the invalid flag after drawing it
     */
    function drawInvalidated() {
        var enabledElements = cornerstone.getEnabledElements();
        for (var i = 0; i < enabledElements.length; i++) {
            var ee = enabledElements[i];
            if (ee.invalid === true) {
                cornerstone.drawImage(ee, true);
            }
        }
    }

    // Module exports
    cornerstone.drawInvalidated = drawInvalidated;
}($, cornerstone));

/**
 * This module is responsible for enabling an element to display images with cornerstone
 */
(function (cornerstone) {

    "use strict";

    function enable(element, options) {
        if (element === undefined) {
            throw "enable: parameter element cannot be undefined";
        }

        // If this enabled element has the option set for WebGL, we should
        // check if this device actually supports it
        if (options && options.renderer && options.renderer.toLowerCase() === 'webgl') {
            if (cornerstone.webGL.renderer.isWebGLAvailable()) {
                // If WebGL is available on the device, initialize the renderer
                // and return the renderCanvas from the WebGL rendering path
                console.log('Using WebGL rendering path');

                cornerstone.webGL.renderer.initRenderer();
                options.renderer = 'webgl';
            } else {
                // If WebGL is not available on this device, we will fall back
                // to using the Canvas renderer
                console.error('WebGL not available, falling back to Canvas renderer');
                delete options.renderer;
            }
        }

        var canvas = document.createElement('canvas');
        element.appendChild(canvas);

        var el = {
            element: element,
            canvas: canvas,
            image: undefined, // will be set once image is loaded
            invalid: false, // true if image needs to be drawn, false if not
            needsRedraw: true,
            options: options,
            data: {}
        };
        cornerstone.addEnabledElement(el);

        cornerstone.resize(element, true);


        function draw() {
            if (el.canvas === undefined) {
                return;
            }
            if (el.needsRedraw && el.image !== undefined) {
                var start = new Date();
                cornerstone.renderImage(el, el.invalid);     

                var context = el.canvas.getContext('2d');

                var end = new Date();
                var diff = end - start;

                var eventData = {
                    viewport: el.viewport,
                    element: el.element,
                    image: el.image,
                    enabledElement: el,
                    canvasContext: context,
                    renderTimeInMs: diff
                };

                el.invalid = false;
                el.needsRedraw = false;
                $(el.element).trigger("CornerstoneImageRendered", eventData);
            }

            cornerstone.requestAnimationFrame(draw);
        }

        draw();

        return element;
    }

    // module/private exports
    cornerstone.enable = enable;
}(cornerstone));

(function (cornerstone) {

    "use strict";

    function getElementData(el, dataType) {
        var ee = cornerstone.getEnabledElement(el);
        if (ee.data.hasOwnProperty(dataType) === false) {
            ee.data[dataType] = {};
        }
        return ee.data[dataType];
    }

    function removeElementData(el, dataType) {
        var ee = cornerstone.getEnabledElement(el);
        delete ee.data[dataType];
    }

    // module/private exports
    cornerstone.getElementData = getElementData;
    cornerstone.removeElementData = removeElementData;

}(cornerstone));
(function (cornerstone) {

    "use strict";

    var enabledElements = [];

    function getEnabledElement(element) {
        if (element === undefined) {
            throw "getEnabledElement: parameter element must not be undefined";
        }
        for (var i = 0; i < enabledElements.length; i++) {
            if (enabledElements[i].element == element) {
                return enabledElements[i];
            }
        }

        throw "element not enabled";
    }

    function addEnabledElement(enabledElement) {
        if (enabledElement === undefined) {
            throw "getEnabledElement: enabledElement element must not be undefined";
        }

        enabledElements.push(enabledElement);
    }

    function getEnabledElementsByImageId(imageId) {
        var ees = [];
        enabledElements.forEach(function (enabledElement) {
            if (enabledElement.image && enabledElement.image.imageId === imageId) {
                ees.push(enabledElement);
            }
        });
        return ees;
    }

    function getEnabledElements() {
        return enabledElements;
    }

    // module/private exports
    cornerstone.getEnabledElement = getEnabledElement;
    cornerstone.addEnabledElement = addEnabledElement;
    cornerstone.getEnabledElementsByImageId = getEnabledElementsByImageId;
    cornerstone.getEnabledElements = getEnabledElements;
}(cornerstone));
/**
 * This module will fit an image to fit inside the canvas displaying it such that all pixels
 * in the image are viewable
 */
(function (cornerstone) {

    "use strict";

    function getImageSize(enabledElement) {
        if (enabledElement.viewport.rotation === 0 || enabledElement.viewport.rotation === 180) {
            return {
                width: enabledElement.image.width,
                height: enabledElement.image.height
            };
        } else {
            return {
                width: enabledElement.image.height,
                height: enabledElement.image.width
            };
        }
    }

    /**
     * Adjusts an images scale and center so the image is centered and completely visible
     * @param element
     */
    function fitToWindow(element) {
        var enabledElement = cornerstone.getEnabledElement(element);
        var imageSize = getImageSize(enabledElement);

        var verticalScale = enabledElement.canvas.height / imageSize.height;
        var horizontalScale = enabledElement.canvas.width / imageSize.width;
        if (horizontalScale < verticalScale) {
            enabledElement.viewport.scale = horizontalScale;
        } else {
            enabledElement.viewport.scale = verticalScale;
        }
        enabledElement.viewport.translation.x = 0;
        enabledElement.viewport.translation.y = 0;
        cornerstone.updateImage(element);
    }

    cornerstone.fitToWindow = fitToWindow;
}(cornerstone));

/**
 * This file is responsible for returning the default viewport for an image
 */

(function ($, cornerstone) {

    "use strict";

    /**
     * returns a default viewport for display the specified image on the specified
     * enabled element.  The default viewport is fit to window
     *
     * @param element
     * @param image
     */
    function getDefaultViewportForImage(element, image) {
        var enabledElement = cornerstone.getEnabledElement(element);
        var viewport = cornerstone.internal.getDefaultViewport(enabledElement.canvas, image);
        return viewport;
    }

    // Module exports
    cornerstone.getDefaultViewportForImage = getDefaultViewportForImage;
}($, cornerstone));
/**
 * This module is responsible for returning the currently displayed image for an element
 */

(function ($, cornerstone) {

    "use strict";

    /**
     * returns the currently displayed image for an element or undefined if no image has
     * been displayed yet
     *
     * @param element
     */
    function getImage(element) {
        var enabledElement = cornerstone.getEnabledElement(element);
        return enabledElement.image;
    }

    // Module exports
    cornerstone.getImage = getImage;
}($, cornerstone));
/**
 * This module returns a subset of the stored pixels of an image
 */
(function (cornerstone) {

    "use strict";

    /**
     * Returns array of pixels with modality LUT transformation applied
     */
    function getPixels(element, x, y, width, height) {

        var storedPixels = cornerstone.getStoredPixels(element, x, y, width, height);
        var ee = cornerstone.getEnabledElement(element);

        var mlutfn = cornerstone.internal.getModalityLUT(ee.image.slope, ee.image.intercept, ee.viewport.modalityLUT);

        var modalityPixels = storedPixels.map(mlutfn);

        return modalityPixels;
    }

    // module exports
    cornerstone.getPixels = getPixels;
}(cornerstone));
/**
 * This module returns a subset of the stored pixels of an image
 */
(function (cornerstone) {

    "use strict";

    /**
     * Returns an array of stored pixels given a rectangle in the image
     * @param element
     * @param x
     * @param y
     * @param width
     * @param height
     * @returns {Array}
     */
    function getStoredPixels(element, x, y, width, height) {
        if (element === undefined) {
            throw "getStoredPixels: parameter element must not be undefined";
        }

        x = Math.round(x);
        y = Math.round(y);
        var ee = cornerstone.getEnabledElement(element);
        var storedPixels = [];
        var index = 0;
        var pixelData = ee.image.getPixelData();
        for (var row = 0; row < height; row++) {
            for (var column = 0; column < width; column++) {
                var spIndex = ((row + y) * ee.image.columns) + (column + x);
                storedPixels[index++] = pixelData[spIndex];
            }
        }
        return storedPixels;
    }

    // module exports
    cornerstone.getStoredPixels = getStoredPixels;
}(cornerstone));
/**
 * This module contains functions to deal with getting and setting the viewport for an enabled element
 */
(function (cornerstone) {

    "use strict";

    /**
     * Returns the viewport for the specified enabled element
     * @param element
     * @returns {*}
     */
    function getViewport(element) {
        var enabledElement = cornerstone.getEnabledElement(element);

        var viewport = enabledElement.viewport;
        if (viewport === undefined) {
            return undefined;
        }
        return {
            scale: viewport.scale,
            translation: {
                x: viewport.translation.x,
                y: viewport.translation.y
            },
            voi: {
                windowWidth: viewport.voi.windowWidth,
                windowCenter: viewport.voi.windowCenter
            },
            invert: viewport.invert,
            pixelReplication: viewport.pixelReplication,
            rotation: viewport.rotation,
            hflip: viewport.hflip,
            vflip: viewport.vflip,
            modalityLUT: viewport.modalityLUT,
            voiLUT: viewport.voiLUT
        };
    }

    // module/private exports
    cornerstone.getViewport = getViewport;

}(cornerstone));

/**
 * This module deals with caching images
 */

(function (cornerstone) {

    "use strict";

    // dictionary of imageId to cachedImage objects
    var imageCache = {};
    // array of cachedImage objects
    var cachedImages = [];

    var maximumSizeInBytes = 1024 * 1024 * 1024; // 1 GB
    var cacheSizeInBytes = 0;

    function setMaximumSizeBytes(numBytes) {
        if (numBytes === undefined) {
            throw "setMaximumSizeBytes: parameter numBytes must not be undefined";
        }
        if (numBytes.toFixed === undefined) {
            throw "setMaximumSizeBytes: parameter numBytes must be a number";
        }

        maximumSizeInBytes = numBytes;
        purgeCacheIfNecessary();
    }

    function purgeCacheIfNecessary() {
        // if max cache size has not been exceeded, do nothing
        if (cacheSizeInBytes <= maximumSizeInBytes) {
            return;
        }

        // cache size has been exceeded, create list of images sorted by timeStamp
        // so we can purge the least recently used image
        function compare(a, b) {
            if (a.timeStamp > b.timeStamp) {
                return -1;
            }
            if (a.timeStamp < b.timeStamp) {
                return 1;
            }
            return 0;
        }
        cachedImages.sort(compare);

        // remove images as necessary
        while (cacheSizeInBytes > maximumSizeInBytes) {
            var lastCachedImage = cachedImages[cachedImages.length - 1];
            var imageId = lastCachedImage.imageId;

            removeImagePromise(imageId);

            $(cornerstone).trigger('CornerstoneImageCachePromiseRemoved', {
                imageId: imageId
            });
        }

        var cacheInfo = cornerstone.imageCache.getCacheInfo();
        $(cornerstone).trigger('CornerstoneImageCacheFull', cacheInfo);
    }

    function putImagePromise(imageId, imagePromise) {
        if (imageId === undefined) {
            throw "getImagePromise: imageId must not be undefined";
        }
        if (imagePromise === undefined) {
            throw "getImagePromise: imagePromise must not be undefined";
        }

        if (imageCache.hasOwnProperty(imageId) === true) {
            throw "putImagePromise: imageId already in cache";
        }

        var cachedImage = {
            loaded: false,
            imageId: imageId,
            sharedCacheKey: undefined, // the sharedCacheKey for this imageId.  undefined by default
            imagePromise: imagePromise,
            timeStamp: new Date(),
            sizeInBytes: 0
        };

        imageCache[imageId] = cachedImage;
        cachedImages.push(cachedImage);

        imagePromise.then(function (image) {
            cachedImage.loaded = true;
            cachedImage.image = image;

            if (image.sizeInBytes === undefined) {
                throw "putImagePromise: image does not have sizeInBytes property or";
            }
            if (image.sizeInBytes.toFixed === undefined) {
                throw "putImagePromise: image.sizeInBytes is not a number";
            }

            cachedImage.sizeInBytes = image.sizeInBytes;
            cacheSizeInBytes += cachedImage.sizeInBytes;
            cachedImage.sharedCacheKey = image.sharedCacheKey;

            purgeCacheIfNecessary();
        });
    }

    function getImagePromise(imageId) {
        if (imageId === undefined) {
            throw "getImagePromise: imageId must not be undefined";
        }
        var cachedImage = imageCache[imageId];
        if (cachedImage === undefined) {
            return undefined;
        }

        // bump time stamp for cached image
        cachedImage.timeStamp = new Date();
        return cachedImage.imagePromise;
    }

    function removeImagePromise(imageId) {
        if (imageId === undefined) {
            throw "removeImagePromise: imageId must not be undefined";
        }
        var cachedImage = imageCache[imageId];
        if (cachedImage === undefined) {
            throw "removeImagePromise: imageId must not be undefined";
        }

        cachedImage.imagePromise.reject();
        cachedImages.splice(cachedImages.indexOf(cachedImage), 1);
        cacheSizeInBytes -= cachedImage.sizeInBytes;
        decache(cachedImage.imagePromise, cachedImage.imageId);

        delete imageCache[imageId];

        return cachedImage.imagePromise;
    }

    function getCacheInfo() {
        return {
            maximumSizeInBytes: maximumSizeInBytes,
            cacheSizeInBytes: cacheSizeInBytes,
            numberOfImagesCached: cachedImages.length
        };
    }

    // This method should only be called by `removeImagePromise` because it's
    // the one that knows how to deal with shared cache keys and cache size.
    function decache(imagePromise, imageId) {
        imagePromise.then(function (image) {
            if (image.decache) {
                image.decache();
            }
        }).always(function () {
            delete imageCache[imageId];
        });
    }

    function purgeCache() {
        while (cachedImages.length > 0) {
            var removedCachedImage = cachedImages[0];
            removeImagePromise(removedCachedImage.imageId);
        }
    }

    function changeImageIdCacheSize(imageId, newCacheSize) {
        var cacheEntry = imageCache[imageId];
        if (cacheEntry) {
            cacheEntry.imagePromise.then(function (image) {
                var cacheSizeDifference = newCacheSize - image.sizeInBytes;
                image.sizeInBytes = newCacheSize;
                cacheSizeInBytes += cacheSizeDifference;
            });
        }
    }

    // module exports
    cornerstone.imageCache = {
        putImagePromise: putImagePromise,
        getImagePromise: getImagePromise,
        removeImagePromise: removeImagePromise,
        setMaximumSizeBytes: setMaximumSizeBytes,
        getCacheInfo: getCacheInfo,
        purgeCache: purgeCache,
        cachedImages: cachedImages,
        imageCache: imageCache,
        changeImageIdCacheSize: changeImageIdCacheSize
    };

}(cornerstone));

/**
 * This module deals with ImageLoaders, loading images and caching images
 */

(function ($, cornerstone) {

    "use strict";

    var imageLoaders = {};

    var unknownImageLoader;

    function loadImageFromImageLoader(imageId, options) {
        var colonIndex = imageId.indexOf(":");
        var scheme = imageId.substring(0, colonIndex);
        var loader = imageLoaders[scheme];
        var imagePromise;
        if (loader === undefined || loader === null) {
            if (unknownImageLoader !== undefined) {
                imagePromise = unknownImageLoader(imageId);
                return imagePromise;
            } else {
                return undefined;
            }
        }
        imagePromise = loader(imageId, options);

        // broadcast an image loaded event once the image is loaded
        // This is based on the idea here: http://stackoverflow.com/questions/3279809/global-custom-events-in-jquery
        imagePromise.then(function (image) {
            $(cornerstone).trigger('CornerstoneImageLoaded', {
                image: image
            });
        });

        return imagePromise;
    }

    // Loads an image given an imageId and optional priority and returns a promise which will resolve
    // to the loaded image object or fail if an error occurred.  The loaded image
    // is not stored in the cache
    function loadImage(imageId, options) {
        if (imageId === undefined) {
            throw "loadImage: parameter imageId must not be undefined";
        }

        var imagePromise = cornerstone.imageCache.getImagePromise(imageId);
        if (imagePromise !== undefined) {
            return imagePromise;
        }

        imagePromise = loadImageFromImageLoader(imageId, options);
        if (imagePromise === undefined) {
            throw "loadImage: no image loader for imageId";
        }

        return imagePromise;
    }

    // Loads an image given an imageId and optional priority and returns a promise which will resolve
    // to the loaded image object or fail if an error occurred.  The image is
    // stored in the cache
    function loadAndCacheImage(imageId, options) {
        if (imageId === undefined) {
            throw "loadAndCacheImage: parameter imageId must not be undefined";
        }

        var imagePromise = cornerstone.imageCache.getImagePromise(imageId);
        if (imagePromise !== undefined) {
            return imagePromise;
        }

        imagePromise = loadImageFromImageLoader(imageId, options);
        if (imagePromise === undefined) {
            throw "loadAndCacheImage: no image loader for imageId";
        }

        cornerstone.imageCache.putImagePromise(imageId, imagePromise);

        return imagePromise;
    }


    // registers an imageLoader plugin with cornerstone for the specified scheme
    function registerImageLoader(scheme, imageLoader) {
        imageLoaders[scheme] = imageLoader;
    }

    // Registers a new unknownImageLoader and returns the previous one (if it exists)
    function registerUnknownImageLoader(imageLoader) {
        var oldImageLoader = unknownImageLoader;
        unknownImageLoader = imageLoader;
        return oldImageLoader;
    }

    // module exports

    cornerstone.loadImage = loadImage;
    cornerstone.loadAndCacheImage = loadAndCacheImage;
    cornerstone.registerImageLoader = registerImageLoader;
    cornerstone.registerUnknownImageLoader = registerUnknownImageLoader;

}($, cornerstone));

(function (cornerstone) {

    "use strict";

    function calculateTransform(enabledElement, scale) {

        var transform = new cornerstone.internal.Transform();
        transform.translate(enabledElement.canvas.width / 2, enabledElement.canvas.height / 2);

        //Apply the rotation before scaling for non square pixels
        var angle = enabledElement.viewport.rotation;
        if (angle !== 0) {
            transform.rotate(angle * Math.PI / 180);
        }

        // apply the scale
        var widthScale = enabledElement.viewport.scale;
        var heightScale = enabledElement.viewport.scale;
        if (enabledElement.image.rowPixelSpacing < enabledElement.image.columnPixelSpacing) {
            widthScale = widthScale * (enabledElement.image.columnPixelSpacing / enabledElement.image.rowPixelSpacing);
        } else if (enabledElement.image.columnPixelSpacing < enabledElement.image.rowPixelSpacing) {
            heightScale = heightScale * (enabledElement.image.rowPixelSpacing / enabledElement.image.columnPixelSpacing);
        }
        transform.scale(widthScale, heightScale);

        // unrotate to so we can translate unrotated
        if (angle !== 0) {
            transform.rotate(-angle * Math.PI / 180);
        }

        // apply the pan offset
        transform.translate(enabledElement.viewport.translation.x, enabledElement.viewport.translation.y);

        // rotate again so we can apply general scale
        if (angle !== 0) {
            transform.rotate(angle * Math.PI / 180);
        }

        if (scale !== undefined) {
            // apply the font scale
            transform.scale(scale, scale);
        }

        //Apply Flip if required
        if (enabledElement.viewport.hflip) {
            transform.scale(-1, 1);
        }

        if (enabledElement.viewport.vflip) {
            transform.scale(1, -1);
        }

        // translate the origin back to the corner of the image so the event handlers can draw in image coordinate system
        transform.translate(-enabledElement.image.width / 2, -enabledElement.image.height / 2);
        return transform;
    }

    // Module exports
    cornerstone.internal.calculateTransform = calculateTransform;
}(cornerstone));
/**
 * This module is responsible for drawing an image to an enabled elements canvas element
 */

(function ($, cornerstone) {

    "use strict";

    function stringToFloatArray(array) {
        return array.split('\\').map(function (value) {
            return parseFloat(value);
        });
    }

    function getDrawImageOffset(targetImageId, referenceImageId) {
        var offset = {
            x: 0,
            y: 0
        };

        var targetImagePlane = cornerstoneTools.metaData.get('imagePlane', targetImageId);
        if (!targetImagePlane ||
            !targetImagePlane.imagePositionPatient ||
            !targetImagePlane.rowCosines ||
            !targetImagePlane.columnCosines) {
            return offset;
        }

        var referenceImagePlane = cornerstoneTools.metaData.get('imagePlane', referenceImageId);
        if (!referenceImagePlane ||
            !referenceImagePlane.imagePositionPatient ||
            !referenceImagePlane.rowCosines ||
            !referenceImagePlane.columnCosines) {
            return offset;
        }

        // TODO: Add Image Orientation check between layers
        var pos = stringToFloatArray(targetImagePlane.imagePositionPatient);
        var origPos = stringToFloatArray(referenceImagePlane.imagePositionPatient)

        offset.x = pos[0] - origPos[0];
        offset.y = pos[1] - origPos[1];
        return offset;
    }


    // This is used to keep each of the layers' viewports in sync with the base layer
    var viewportRatio = {};

    /**
     * Internal API function to draw to an enabled element
     * @param enabledElement
     * @param invalidated - true if pixel data has been invalidated and cached rendering should not be used
     */
    function renderCompositeImage(enabledElement, invalidated) {
        // Calculate the base layer's default viewport parameters if they don't already exist
        // and store them
        var baseLayer = enabledElement.layers[0];
        baseLayer.viewport = baseLayer.viewport || cornerstone.internal.getDefaultViewport(enabledElement.canvas, baseLayer.image);

        // Store the base layer's viewport and image data on the enabled element so that tools can interact with it
        enabledElement.viewport = baseLayer.viewport;
        enabledElement.image = baseLayer.image;

        // Make an array of only the visible layers to save time
        var visibleLayers = enabledElement.layers.filter(function (layer) {
            if (layer.options && layer.options.visible !== false && layer.options.opacity !== 0) {
                return true;
            }
        });

        // If we intend to keep the viewport's scale and translation in sync,
        // loop through the layers 
        if (enabledElement.syncViewports === true) {
            viewportRatio[baseLayer.layerId] = 1;
            visibleLayers.forEach(function (layer, index) {
                // Don't do anything to the base layer
                if (index === 0) {
                    return;
                }

                // If no viewport has been set yet for this layer, calculate the default viewport
                // parameters
                if (!layer.viewport) {
                    layer.viewport = cornerstone.internal.getDefaultViewport(enabledElement.canvas, layer.image);
                    viewportRatio[layer.layerId] = layer.viewport.scale / baseLayer.viewport.scale;
                }

                // Update the layer's translation and scale to keep them in sync with the first image
                // based on the stored ratios between the images
                layer.viewport.scale = baseLayer.viewport.scale * viewportRatio[layer.layerId];
                layer.viewport.rotation = baseLayer.viewport.rotation;
                layer.viewport.translation = {
                    x: baseLayer.viewport.translation.x * layer.image.width / baseLayer.image.width,
                    y: baseLayer.viewport.translation.y * layer.image.height / baseLayer.image.height
                };
            });
        }

        // Get the enabled element's canvas so we can draw to it
        var context = enabledElement.canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, 0, 0);

        // Clear the canvas
        context.fillStyle = 'black';
        context.fillRect(0, 0, enabledElement.canvas.width, enabledElement.canvas.height);

        // Loop through each layer and draw it to the canvas
        visibleLayers.forEach(function (layer, index) {
            context.save();

            // Set the layer's canvas to the pixel coordinate system
            layer.canvas = enabledElement.canvas;
            cornerstone.setToPixelCoordinateSystem(layer, context);

            // Render into the layer's canvas
            if (layer.image.color === true) {
                cornerstone.addColorLayer(layer, invalidated);
            } else {
                cornerstone.addGrayscaleLayer(layer, invalidated);
            }

            // Apply any global opacity settings that have been defined for this layer
            if (layer.options && layer.options.opacity) {
                context.globalAlpha = layer.options.opacity;
            } else {
                context.globalAlpha = 1;
            }

            // Calculate any offset between the position of the base layer and the current layer
            var offset = getDrawImageOffset(layer.image.imageId, baseLayer.image.imageId);

            // Draw from the current layer's canvas onto the enabled element's canvas
            context.drawImage(layer.canvas, 0, 0, layer.image.width, layer.image.height, offset.x, offset.y, layer.image.width, layer.image.height);

            context.restore();
        });
    }


    /**
     * Internal API function to draw a composite image to a given enabled element
     * @param enabledElement
     * @param invalidated - true if pixel data has been invalidated and cached rendering should not be used
     */
    function drawCompositeImage(enabledElement, invalidated) {
        renderCompositeImage(enabledElement, invalidated);
    }

    // Module exports
    cornerstone.internal.drawCompositeImage = drawCompositeImage;
    cornerstone.internal.renderCompositeImage = renderCompositeImage;
    cornerstone.drawCompositeImage = drawCompositeImage;

}($, cornerstone));
/**
 * This module is responsible for drawing an image to an enabled elements canvas element
 */

(function ($, cornerstone) {

    "use strict";

    /**
     * Internal API function to draw an image to a given enabled element
     * @param enabledElement
     * @param invalidated - true if pixel data has been invalidated and cached rendering should not be used
     */
    function drawImage(enabledElement, invalidated) {
        enabledElement.needsRedraw = true;
        if (invalidated) {
            enabledElement.invalid = true;
        }

    }

    // Module exports
    cornerstone.internal.drawImage = drawImage;
    cornerstone.drawImage = drawImage;

}($, cornerstone));
/**
 * This module generates a lut for an image
 */

(function (cornerstone) {

    "use strict";

    function generateLutNew(image, windowWidth, windowCenter, invert, modalityLUT, voiLUT) {
        if (image.lut === undefined) {
            image.lut = new Int16Array(image.maxPixelValue - Math.min(image.minPixelValue, 0) + 1);
        }
        var lut = image.lut;
        var maxPixelValue = image.maxPixelValue;
        var minPixelValue = image.minPixelValue;

        var mlutfn = cornerstone.internal.getModalityLUT(image.slope, image.intercept, modalityLUT);
        var vlutfn = cornerstone.internal.getVOILUT(windowWidth, windowCenter, voiLUT);

        var offset = 0;
        if (minPixelValue < 0) {
            offset = minPixelValue;
        }
        var storedValue;
        var modalityLutValue;
        var voiLutValue;
        var clampedValue;

        for (storedValue = image.minPixelValue; storedValue <= maxPixelValue; storedValue++) {
            modalityLutValue = mlutfn(storedValue);
            voiLutValue = vlutfn(modalityLutValue);
            clampedValue = Math.min(Math.max(voiLutValue, 0), 255);
            if (!invert) {
                lut[storedValue + (-offset)] = Math.round(clampedValue);
            } else {
                lut[storedValue + (-offset)] = Math.round(255 - clampedValue);
            }
        }
        return lut;
    }



    /**
     * Creates a LUT used while rendering to convert stored pixel values to
     * display pixels
     *
     * @param image
     * @returns {Array}
     */
    function generateLut(image, windowWidth, windowCenter, invert, modalityLUT, voiLUT) {
        if (modalityLUT || voiLUT) {
            return generateLutNew(image, windowWidth, windowCenter, invert, modalityLUT, voiLUT);
        }

        if (image.lut === undefined) {
            image.lut = new Int16Array(image.maxPixelValue - Math.min(image.minPixelValue, 0) + 1);
        }
        var lut = image.lut;

        var maxPixelValue = image.maxPixelValue;
        var minPixelValue = image.minPixelValue;
        var slope = image.slope;
        var intercept = image.intercept;
        var localWindowWidth = windowWidth;
        var localWindowCenter = windowCenter;
        var modalityLutValue;
        var voiLutValue;
        var clampedValue;
        var storedValue;

        // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
        // We improve performance by offsetting the pixel values for signed data to avoid negative indexes
        // when generating the lut and then undo it in storedPixelDataToCanvasImagedata.  Thanks to @jpambrun
        // for this contribution!

        var offset = 0;
        if (minPixelValue < 0) {
            offset = minPixelValue;
        }

        if (invert === true) {
            for (storedValue = image.minPixelValue; storedValue <= maxPixelValue; storedValue++) {
                modalityLutValue = storedValue * slope + intercept;
                voiLutValue = (((modalityLutValue - (localWindowCenter)) / (localWindowWidth) + 0.5) * 255.0);
                clampedValue = Math.min(Math.max(voiLutValue, 0), 255);
                lut[storedValue + (-offset)] = Math.round(255 - clampedValue);
            }
        } else {
            for (storedValue = image.minPixelValue; storedValue <= maxPixelValue; storedValue++) {
                modalityLutValue = storedValue * slope + intercept;
                voiLutValue = (((modalityLutValue - (localWindowCenter)) / (localWindowWidth) + 0.5) * 255.0);
                clampedValue = Math.min(Math.max(voiLutValue, 0), 255);
                lut[storedValue + (-offset)] = Math.round(clampedValue);
            }
        }
    }


    // Module exports
    cornerstone.internal.generateLutNew = generateLutNew;
    cornerstone.internal.generateLut = generateLut;
    cornerstone.generateLutNew = generateLutNew;
    cornerstone.generateLut = generateLut;
}(cornerstone));

/**
 * This module contains a function to get a default viewport for an image given
 * a canvas element to display it in
 *
 */
(function (cornerstone) {

    "use strict";

    /**
     * Creates a new viewport object containing default values for the image and canvas
     * @param canvas
     * @param image
     * @returns viewport object
     */
    function getDefaultViewport(canvas, image) {
        if (canvas === undefined) {
            throw "getDefaultViewport: parameter canvas must not be undefined";
        }
        if (image === undefined) {
            throw "getDefaultViewport: parameter image must not be undefined";
        }
        var viewport = {
            scale: 1.0,
            translation: {
                x: 0,
                y: 0
            },
            voi: {
                windowWidth: image.windowWidth,
                windowCenter: image.windowCenter,
            },
            invert: image.invert,
            pixelReplication: false,
            rotation: 0,
            hflip: false,
            vflip: false,
            modalityLUT: image.modalityLUT,
            voiLUT: image.voiLUT
        };

        // fit image to window
        var verticalScale = canvas.height / image.rows;
        var horizontalScale = canvas.width / image.columns;
        if (horizontalScale < verticalScale) {
            viewport.scale = horizontalScale;
        } else {
            viewport.scale = verticalScale;
        }
        return viewport;
    }

    // module/private exports
    cornerstone.internal.getDefaultViewport = getDefaultViewport;
    cornerstone.getDefaultViewport = getDefaultViewport;
}(cornerstone));

(function (cornerstone) {

    "use strict";

    function getTransform(enabledElement) {
        // For now we will calculate it every time it is requested.  In the future, we may want to cache
        // it in the enabled element to speed things up
        var transform = cornerstone.internal.calculateTransform(enabledElement);
        return transform;
    }

    // Module exports
    cornerstone.internal.getTransform = getTransform;

}(cornerstone));
/**
 * This module is responsible for drawing an image to an enabled elements canvas element
 */

(function ($, cornerstone) {

    "use strict";

    cornerstone.drawImage = cornerstone.internal.drawImage;
    cornerstone.generateLut = cornerstone.internal.generateLut;
    cornerstone.storedPixelDataToCanvasImageData = cornerstone.internal.storedPixelDataToCanvasImageData;
    cornerstone.storedColorPixelDataToCanvasImageData = cornerstone.internal.storedColorPixelDataToCanvasImageData;

}($, cornerstone));
/**
 * This module generates a Modality LUT
 */

(function (cornerstone) {

    "use strict";


    function generateLinearModalityLUT(slope, intercept) {
        var localSlope = slope;
        var localIntercept = intercept;
        return function (sp) {
            return sp * localSlope + localIntercept;
        }
    }

    function generateNonLinearModalityLUT(modalityLUT) {
        var minValue = modalityLUT.lut[0];
        var maxValue = modalityLUT.lut[modalityLUT.lut.length - 1];
        var maxValueMapped = modalityLUT.firstValueMapped + modalityLUT.lut.length;
        return function (sp) {
            if (sp < modalityLUT.firstValueMapped) {
                return minValue;
            } else if (sp >= maxValueMapped) {
                return maxValue;
            } else {
                return modalityLUT.lut[sp];
            }
        }
    }

    function getModalityLUT(slope, intercept, modalityLUT) {
        if (modalityLUT) {
            return generateNonLinearModalityLUT(modalityLUT);
        } else {
            return generateLinearModalityLUT(slope, intercept);
        }
    }

    // Module exports
    cornerstone.internal.getModalityLUT = getModalityLUT;

}(cornerstone));

/**
 * This module polyfills requestAnimationFrame for older browsers.
 */


(function (cornerstone) {

    'use strict';

    function requestFrame(callback) {
        window.setTimeout(callback, 1000 / 60);
    }

    function requestAnimationFrame(callback) {
        return window.requestAnimationFrame(callback) ||
            window.webkitRequestAnimationFrame(callback) ||
            window.mozRequestAnimationFrame(callback) ||
            window.oRequestAnimationFrame(callback) ||
            window.msRequestAnimationFrame(callback) ||
            requestFrame(callback);
    }

    // Module exports
    cornerstone.requestAnimationFrame = requestAnimationFrame;

})(cornerstone);
/**
 * This module contains a function to convert stored pixel values to display pixel values using a LUT
 */
(function (cornerstone) {

    "use strict";

    function storedColorPixelDataToCanvasImageData(image, lut, canvasImageDataData) {
        var minPixelValue = image.minPixelValue;
        var canvasImageDataIndex = 0;
        var storedPixelDataIndex = 0;
        var numPixels = image.width * image.height * 4;
        var storedPixelData = image.getPixelData();
        var localLut = lut;
        var localCanvasImageDataData = canvasImageDataData;

        if (image.rgba === true) {
            // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
            // We have a special code path for this case that improves performance.  Thanks to @jpambrun for this enhancement
            if (minPixelValue < 0) {
                while (storedPixelDataIndex < numPixels) {
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++] + (-minPixelValue)]; // red
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++] + (-minPixelValue)]; // green
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++] + (-minPixelValue)]; // blue
                    localCanvasImageDataData[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++]; // alpha
                }
            } else {
                while (storedPixelDataIndex < numPixels) {
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++]]; // red
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++]]; // green
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++]]; // blue
                    localCanvasImageDataData[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++]; // alpha
                }
            }
        } else {
            // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
            // We have a special code path for this case that improves performance.  Thanks to @jpambrun for this enhancement
            if (minPixelValue < 0) {
                while (storedPixelDataIndex < numPixels) {
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++] + (-minPixelValue)]; // red
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++] + (-minPixelValue)]; // green
                    localCanvasImageDataData[canvasImageDataIndex] = localLut[storedPixelData[storedPixelDataIndex] + (-minPixelValue)]; // blue
                    storedPixelDataIndex += 2;
                    canvasImageDataIndex += 2;
                }
            } else {
                while (storedPixelDataIndex < numPixels) {
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++]]; // red
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++]]; // green
                    localCanvasImageDataData[canvasImageDataIndex] = localLut[storedPixelData[storedPixelDataIndex]]; // blue
                    storedPixelDataIndex += 2;
                    canvasImageDataIndex += 2;
                }
            }
        }
    }

    // Module exports
    cornerstone.internal.storedColorPixelDataToCanvasImageData = storedColorPixelDataToCanvasImageData;
    cornerstone.storedColorPixelDataToCanvasImageData = storedColorPixelDataToCanvasImageData;

}(cornerstone));

/**
 * This module contains a function to convert stored pixel values to display pixel values using a LUT
 */
(function (cornerstone) {

    "use strict";

    /**
     * This function transforms stored pixel values into a canvas image data buffer
     * by using a LUT.  This is the most performance sensitive code in cornerstone and
     * we use a special trick to make this go as fast as possible.  Specifically we
     * use the alpha channel only to control the luminance rather than the red, green and
     * blue channels which makes it over 3x faster.  The canvasImageDataData buffer needs
     * to be previously filled with white pixels.
     *
     * NOTE: Attribution would be appreciated if you use this technique!
     *
     * @param pixelData the pixel data
     * @param lut the lut
     * @param canvasImageDataData a canvasImgageData.data buffer filled with white pixels
     */
    function storedPixelDataToCanvasImageData(image, lut, canvasImageDataData) {
        var pixelData = image.getPixelData();
        var minPixelValue = image.minPixelValue;
        var canvasImageDataIndex = 3;
        var storedPixelDataIndex = 0;
        var localNumPixels = pixelData.length;
        var localPixelData = pixelData;
        var localLut = lut;
        var localCanvasImageDataData = canvasImageDataData;

        (function () {
            // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
            // We have a special code path for this case that improves performance.  Thanks to @jpambrun for this enhancement
            if (minPixelValue < 0) {
                while (storedPixelDataIndex < localNumPixels) {
                    localCanvasImageDataData[canvasImageDataIndex] = localLut[localPixelData[storedPixelDataIndex++] + (-minPixelValue)]; // alpha
                    canvasImageDataIndex += 4;
                }
            } else {
                while (storedPixelDataIndex < localNumPixels) {
                    localCanvasImageDataData[canvasImageDataIndex] = localLut[localPixelData[storedPixelDataIndex++]]; // alpha
                    canvasImageDataIndex += 4;
                }
            }
        })();
    }

    // Module exports
    cornerstone.internal.storedPixelDataToCanvasImageData = storedPixelDataToCanvasImageData;
    cornerstone.storedPixelDataToCanvasImageData = storedPixelDataToCanvasImageData;

}(cornerstone));

// Last updated November 2011
// By Simon Sarris
// www.simonsarris.com
// sarris@acm.org
//
// Free to use and distribute at will
// So long as you are nice to people, etc

// Simple class for keeping track of the current transformation matrix

// For instance:
//    var t = new Transform();
//    t.rotate(5);
//    var m = t.m;
//    ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);

// Is equivalent to:
//    ctx.rotate(5);

// But now you can retrieve it :)

(function (cornerstone) {

    "use strict";


    // Remember that this does not account for any CSS transforms applied to the canvas
    function Transform() {
        this.reset();
    }

    Transform.prototype.reset = function () {
        this.m = [1, 0, 0, 1, 0, 0];
    };

    Transform.prototype.clone = function () {
        var transform = new Transform();
        transform.m[0] = this.m[0];
        transform.m[1] = this.m[1];
        transform.m[2] = this.m[2];
        transform.m[3] = this.m[3];
        transform.m[4] = this.m[4];
        transform.m[5] = this.m[5];
        return transform;
    };


    Transform.prototype.multiply = function (matrix) {
        var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
        var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

        var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
        var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];

        var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
        var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        this.m[4] = dx;
        this.m[5] = dy;
    };

    Transform.prototype.invert = function () {
        var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
        var m0 = this.m[3] * d;
        var m1 = -this.m[1] * d;
        var m2 = -this.m[2] * d;
        var m3 = this.m[0] * d;
        var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
        var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
        this.m[0] = m0;
        this.m[1] = m1;
        this.m[2] = m2;
        this.m[3] = m3;
        this.m[4] = m4;
        this.m[5] = m5;
    };

    Transform.prototype.rotate = function (rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var m11 = this.m[0] * c + this.m[2] * s;
        var m12 = this.m[1] * c + this.m[3] * s;
        var m21 = this.m[0] * -s + this.m[2] * c;
        var m22 = this.m[1] * -s + this.m[3] * c;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
    };

    Transform.prototype.translate = function (x, y) {
        this.m[4] += this.m[0] * x + this.m[2] * y;
        this.m[5] += this.m[1] * x + this.m[3] * y;
    };

    Transform.prototype.scale = function (sx, sy) {
        this.m[0] *= sx;
        this.m[1] *= sx;
        this.m[2] *= sy;
        this.m[3] *= sy;
    };

    Transform.prototype.transformPoint = function (px, py) {
        var x = px;
        var y = py;
        px = x * this.m[0] + y * this.m[2] + this.m[4];
        py = x * this.m[1] + y * this.m[3] + this.m[5];
        return {
            x: px,
            y: py
        };
    };

    cornerstone.internal.Transform = Transform;
}(cornerstone));
/**
 * This module generates a VOI LUT
 */

(function (cornerstone) {

    "use strict";

    function generateLinearVOILUT(windowWidth, windowCenter) {
        return function (modalityLutValue) {
            return (((modalityLutValue - (windowCenter)) / (windowWidth) + 0.5) * 255.0);
        }
    }

    function generateNonLinearVOILUT(voiLUT) {
        var shift = voiLUT.numBitsPerEntry - 8;
        var minValue = voiLUT.lut[0] >> shift;
        var maxValue = voiLUT.lut[voiLUT.lut.length - 1] >> shift;
        var maxValueMapped = voiLUT.firstValueMapped + voiLUT.lut.length - 1;
        return function (modalityLutValue) {
            if (modalityLutValue < voiLUT.firstValueMapped) {
                return minValue;
            } else if (modalityLutValue >= maxValueMapped) {
                return maxValue;
            } else {
                return voiLUT.lut[modalityLutValue - voiLUT.firstValueMapped] >> shift;
            }
        }
    }

    function getVOILUT(windowWidth, windowCenter, voiLUT) {
        if (voiLUT) {
            return generateNonLinearVOILUT(voiLUT);
        } else {
            return generateLinearVOILUT(windowWidth, windowCenter);
        }
    }

    // Module exports
    cornerstone.internal.getVOILUT = getVOILUT;
}(cornerstone));

/**
 * This module contains a function to make an image is invalid
 */
(function (cornerstone) {

    "use strict";

    /**
     * Sets the invalid flag on the enabled element and fire an event
     * @param element
     */
    function invalidate(element) {
        var enabledElement = cornerstone.getEnabledElement(element);
        enabledElement.invalid = true;
        enabledElement.needsRedraw = true;
        var eventData = {
            element: element
        };
        $(enabledElement.element).trigger("CornerstoneInvalidated", eventData);
    }

    // module exports
    cornerstone.invalidate = invalidate;
}(cornerstone));
/**
 * This module contains a function to immediately invalidate an image
 */
(function (cornerstone) {

    "use strict";

    /**
     * Forces the image to be updated/redrawn for the specified enabled element
     * @param element
     */
    function invalidateImageId(imageId) {

        var enabledElements = cornerstone.getEnabledElementsByImageId(imageId);
        enabledElements.forEach(function (enabledElement) {
            cornerstone.drawImage(enabledElement, true);
        });
    }

    // module exports
    cornerstone.invalidateImageId = invalidateImageId;
}(cornerstone));
(function (cornerstone) {

    "use strict";

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function indexOfInObjectArray(array, property, value) {
        var found = -1;
        array.forEach(function (object, index) {
            if (object[property] === value) {
                found = index;
                return false;
            }
        });

        return found;
    }

    function addLayer(element, image, options) {
        var enabledElement = cornerstone.getEnabledElement(element);

        var layerId = guid();

        // Set syncViewports to true by default when a new layer is added
        if (enabledElement.syncViewports === undefined) {
            enabledElement.syncViewports = true;
        }

        var layerEnabledElement = {
            image: image,
            layerId: layerId,
            options: options || {}
        };

        enabledElement.layers.push(layerEnabledElement);

        console.log('Layer added: ' + layerId);
        return layerId;
    }

    function removeLayer(element, layerId) {
        var enabledElement = cornerstone.getEnabledElement(element);
        var index = indexOfInObjectArray(enabledElement.layers, 'layerId', layerId);
        if (index !== -1) {
            enabledElement.layers.splice(index, 1);
            console.log('Layer removed: ' + layerId);
        }
    }

    function getLayers(element, layerId) {
        var enabledElement = cornerstone.getEnabledElement(element);

        // If a layer ID is provided, return the details of that layer
        if (layerId) {
            var index = indexOfInObjectArray(enabledElement.layers, 'layerId', layerId);
            if (index !== -1) {
                return enabledElement.layers[index];
            }
        }

        return enabledElement.layers;
    }

    // module/private exports
    cornerstone.addLayer = addLayer;
    cornerstone.removeLayer = removeLayer;
    cornerstone.getLayers = getLayers;

}(cornerstone));

(function ($, cornerstone) {

    'use strict';

    // this module defines a way to access various metadata about an imageId.  This layer of abstraction exists
    // so metadata can be provided in different ways (e.g. by parsing DICOM P10 or by a WADO-RS document)

    var providers = [];

    /**
     * Adds a metadata provider with the specified priority
     * @param provider
     * @param priority - 0 is default/normal, > 0 is high, < 0 is low
     */
    function addProvider(provider, priority) {
        priority = priority || 0; // default priority
        // find the right spot to insert this provider based on priority
        for (var i = 0; i < providers.length; i++) {
            if (providers[i].priority <= priority) {
                break;
            }
        }

        // insert the decode task at position i
        providers.splice(i, 0, {
            priority: priority,
            provider: provider
        });

    }

    /**
     * Removes the specified provider
     * @param provider
     */
    function removeProvider(provider) {
        for (var i = 0; i < providers.length; i++) {
            if (providers[i].provider === provider) {
                providers.splice(i, 1);
                return;
            }
        }
    }

    /**
     * Gets metadata from the registered metadata providers.  Will call each one from highest priority to lowest
     * until one responds
     *
     * @param type
     * @param imageId
     * @returns {boolean}
     */
    function getMetaData(type, imageId) {
        // invoke each provider in priority order until one returns something
        for (var i = 0; i < providers.length; i++) {
            var result;
            result = providers[i].provider(type, imageId);
            if (result !== undefined) {
                return result;
            }
        }
    }

    // module/private exports
    cornerstone.metaData = {
        addProvider: addProvider,
        removeProvider: removeProvider,
        get: getMetaData
    };

})($, cornerstone);

/**
 * This module contains a helper function to covert page coordinates to pixel coordinates
 */
(function (cornerstone) {

    "use strict";

    /**
     * Converts a point in the page coordinate system to the pixel coordinate
     * system
     * @param element
     * @param pageX
     * @param pageY
     * @returns {{x: number, y: number}}
     */
    function pageToPixel(element, pageX, pageY) {
        var enabledElement = cornerstone.getEnabledElement(element);

        if (enabledElement.image === undefined) {
            throw "image has not been loaded yet";
        }

        var image = enabledElement.image;

        // convert the pageX and pageY to the canvas client coordinates
        var rect = element.getBoundingClientRect();
        var clientX = pageX - rect.left - window.pageXOffset;
        var clientY = pageY - rect.top - window.pageYOffset;

        var pt = {
            x: clientX,
            y: clientY
        };
        var transform = cornerstone.internal.getTransform(enabledElement);
        transform.invert();
        return transform.transformPoint(pt.x, pt.y);
    }

    // module/private exports
    cornerstone.pageToPixel = pageToPixel;

}(cornerstone));

(function (cornerstone) {

    "use strict";

    function pixelDataToFalseColorData(image, lut) {
        if (image.color && !image.falseColor) {
            throw "Color transforms are not implemented yet";
        }

        var minPixelValue = image.minPixelValue;
        var canvasImageDataIndex = 0;
        var storedPixelDataIndex = 0;
        var numPixels = image.width * image.height;
        var origPixelData = image.origPixelData || image.getPixelData();
        var storedColorPixelData = new Uint8Array(numPixels * 4);
        var localLut = lut;
        var sp, mapped;

        image.color = true;
        image.falseColor = true;
        image.origPixelData = origPixelData;

        if (lut instanceof cornerstone.colors.LookupTable) {
            lut.build();

            while (storedPixelDataIndex < numPixels) {
                sp = origPixelData[storedPixelDataIndex++];
                mapped = lut.mapValue(sp);
                storedColorPixelData[canvasImageDataIndex++] = mapped[0];
                storedColorPixelData[canvasImageDataIndex++] = mapped[1];
                storedColorPixelData[canvasImageDataIndex++] = mapped[2];
                storedColorPixelData[canvasImageDataIndex++] = mapped[3];
            }
        } else {
            if (minPixelValue < 0) {
                while (storedPixelDataIndex < numPixels) {
                    sp = origPixelData[storedPixelDataIndex++];
                    storedColorPixelData[canvasImageDataIndex++] = localLut[sp + (-minPixelValue)][0]; // red
                    storedColorPixelData[canvasImageDataIndex++] = localLut[sp + (-minPixelValue)][1]; // green
                    storedColorPixelData[canvasImageDataIndex++] = localLut[sp + (-minPixelValue)][2]; // blue
                    storedColorPixelData[canvasImageDataIndex++] = localLut[sp + (-minPixelValue)][3]; // alpha
                }
            } else {
                while (storedPixelDataIndex < numPixels) {
                    sp = origPixelData[storedPixelDataIndex++];
                    try {
                        storedColorPixelData[canvasImageDataIndex++] = localLut[sp][0]; // red
                        storedColorPixelData[canvasImageDataIndex++] = localLut[sp][1]; // green
                        storedColorPixelData[canvasImageDataIndex++] = localLut[sp][2]; // blue
                        storedColorPixelData[canvasImageDataIndex++] = localLut[sp][3]; // alpha
                    } catch (error) {
                        console.log(sp);
                        console.log(error);
                    }
                }
            }

        }

        image.rgba = true;
        image.lut = undefined;
        image.minPixelValue = 0;
        image.maxPixelValue = 255;
        image.windowWidth = 255;
        image.windowCenter = 128;
        image.getPixelData = function () {
            return storedColorPixelData;
        };
    }

    cornerstone.pixelDataToFalseColorData = pixelDataToFalseColorData;

}(cornerstone));
(function (cornerstone) {

    "use strict";

    /**
     * Converts a point in the pixel coordinate system to the canvas coordinate system
     * system.  This can be used to render using canvas context without having the weird
     * side effects that come from scaling and non square pixels
     * @param element
     * @param pt
     * @returns {x: number, y: number}
     */
    function pixelToCanvas(element, pt) {
        var enabledElement = cornerstone.getEnabledElement(element);
        var transform = cornerstone.internal.getTransform(enabledElement);
        return transform.transformPoint(pt.x, pt.y);
    }

    // module/private exports
    cornerstone.pixelToCanvas = pixelToCanvas;

}(cornerstone));

/**
 * This module is responsible for drawing an image to an enabled elements canvas element
 */

(function (cornerstone) {

    "use strict";

    var colorRenderCanvas = document.createElement('canvas');
    var colorRenderCanvasContext;
    var colorRenderCanvasData;

    var lastRenderedImageId;
    var lastRenderedViewport = {};

    function initializeColorRenderCanvas(image) {
        // Resize the canvas
        colorRenderCanvas.width = image.width;
        colorRenderCanvas.height = image.height;

        // get the canvas data so we can write to it directly
        colorRenderCanvasContext = colorRenderCanvas.getContext('2d');
        colorRenderCanvasContext.fillStyle = 'white';
        colorRenderCanvasContext.fillRect(0, 0, colorRenderCanvas.width, colorRenderCanvas.height);
        colorRenderCanvasData = colorRenderCanvasContext.getImageData(0, 0, image.width, image.height);
    }


    function getLut(image, viewport) {
        // if we have a cached lut and it has the right values, return it immediately
        if (image.lut !== undefined &&
            image.lut.windowCenter === viewport.voi.windowCenter &&
            image.lut.windowWidth === viewport.voi.windowWidth &&
            image.lut.invert === viewport.invert) {
            return image.lut;
        }

        // lut is invalid or not present, regenerate it and cache it
        cornerstone.generateLut(image, viewport.voi.windowWidth, viewport.voi.windowCenter, viewport.invert);
        image.lut.windowWidth = viewport.voi.windowWidth;
        image.lut.windowCenter = viewport.voi.windowCenter;
        image.lut.invert = viewport.invert;
        return image.lut;
    }

    function doesImageNeedToBeRendered(enabledElement, image) {
        if (image.imageId !== lastRenderedImageId ||
            lastRenderedViewport.windowCenter !== enabledElement.viewport.voi.windowCenter ||
            lastRenderedViewport.windowWidth !== enabledElement.viewport.voi.windowWidth ||
            lastRenderedViewport.invert !== enabledElement.viewport.invert ||
            lastRenderedViewport.rotation !== enabledElement.viewport.rotation ||
            lastRenderedViewport.hflip !== enabledElement.viewport.hflip ||
            lastRenderedViewport.vflip !== enabledElement.viewport.vflip
        ) {
            return true;
        }

        return false;
    }

    function getRenderCanvas(enabledElement, image, invalidated) {

        // The ww/wc is identity and not inverted - get a canvas with the image rendered into it for
        // fast drawing
        if (enabledElement.viewport.voi.windowWidth === 255 &&
            enabledElement.viewport.voi.windowCenter === 128 &&
            enabledElement.viewport.invert === false &&
            image.getCanvas &&
            image.getCanvas()
        ) {
            return image.getCanvas();
        }

        // apply the lut to the stored pixel data onto the render canvas
        if (doesImageNeedToBeRendered(enabledElement, image) === false && invalidated !== true) {
            return colorRenderCanvas;
        }

        // If our render canvas does not match the size of this image reset it
        // NOTE: This might be inefficient if we are updating multiple images of different
        // sizes frequently.
        if (colorRenderCanvas.width !== image.width || colorRenderCanvas.height != image.height) {
            initializeColorRenderCanvas(image);
        }

        // get the lut to use
        var colorLut = getLut(image, enabledElement.viewport);

        // the color image voi/invert has been modified - apply the lut to the underlying
        // pixel data and put it into the renderCanvas
        cornerstone.storedColorPixelDataToCanvasImageData(image, colorLut, colorRenderCanvasData.data);
        colorRenderCanvasContext.putImageData(colorRenderCanvasData, 0, 0);
        return colorRenderCanvas;
    }

    /**
     * API function to render a color image to an enabled element
     * @param enabledElement
     * @param invalidated - true if pixel data has been invaldiated and cached rendering should not be used
     */
    function renderColorImage(enabledElement, invalidated) {

        if (enabledElement === undefined) {
            throw "drawImage: enabledElement parameter must not be undefined";
        }
        var image = enabledElement.image;
        if (image === undefined) {
            throw "drawImage: image must be loaded before it can be drawn";
        }

        // get the canvas context and reset the transform
        var context = enabledElement.canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, 0, 0);

        // clear the canvas
        context.fillStyle = 'black';
        context.fillRect(0, 0, enabledElement.canvas.width, enabledElement.canvas.height);

        // turn off image smooth/interpolation if pixelReplication is set in the viewport
        if (enabledElement.viewport.pixelReplication === true) {
            context.imageSmoothingEnabled = false;
            context.mozImageSmoothingEnabled = false; // firefox doesn't support imageSmoothingEnabled yet
        } else {
            context.imageSmoothingEnabled = true;
            context.mozImageSmoothingEnabled = true;
        }

        // save the canvas context state and apply the viewport properties
        context.save();
        cornerstone.setToPixelCoordinateSystem(enabledElement, context);

        var renderCanvas;
        if (enabledElement.options && enabledElement.options.renderer &&
            enabledElement.options.renderer.toLowerCase() === 'webgl') {
            // If this enabled element has the option set for WebGL, we should
            // user it as our renderer.
            renderCanvas = cornerstone.webGL.renderer.render(enabledElement);
        } else {
            // If no options are set we will retrieve the renderCanvas through the
            // normal Canvas rendering path
            renderCanvas = getRenderCanvas(enabledElement, image, invalidated);
        }

        context.drawImage(renderCanvas, 0, 0, image.width, image.height, 0, 0, image.width, image.height);

        context.restore();

        lastRenderedImageId = image.imageId;
        lastRenderedViewport.windowCenter = enabledElement.viewport.voi.windowCenter;
        lastRenderedViewport.windowWidth = enabledElement.viewport.voi.windowWidth;
        lastRenderedViewport.invert = enabledElement.viewport.invert;
        lastRenderedViewport.rotation = enabledElement.viewport.rotation;
        lastRenderedViewport.hflip = enabledElement.viewport.hflip;
        lastRenderedViewport.vflip = enabledElement.viewport.vflip;
    }

    function addColorLayer(layer, invalidated) {
        if (layer === undefined) {
            throw "drawImage: layer parameter must not be undefined";
        }

        var image = layer.image;
        if (image === undefined) {
            throw "drawImage: image must be loaded before it can be drawn";
        }


        layer.canvas = getRenderCanvas(layer, image, invalidated);
        var context = layer.canvas.getContext('2d');

        // turn off image smooth/interpolation if pixelReplication is set in the viewport
        if (layer.viewport.pixelReplication === true) {
            context.imageSmoothingEnabled = false;
            context.mozImageSmoothingEnabled = false; // firefox doesn't support imageSmoothingEnabled yet
        } else {
            context.imageSmoothingEnabled = true;
            context.mozImageSmoothingEnabled = true;
        }

        lastRenderedImageId = image.imageId;
        lastRenderedViewport.windowCenter = layer.viewport.voi.windowCenter;
        lastRenderedViewport.windowWidth = layer.viewport.voi.windowWidth;
        lastRenderedViewport.invert = layer.viewport.invert;
        lastRenderedViewport.rotation = layer.viewport.rotation;
        lastRenderedViewport.hflip = layer.viewport.hflip;
        lastRenderedViewport.vflip = layer.viewport.vflip;
        lastRenderedViewport.modalityLUT = layer.viewport.modalityLUT;
        lastRenderedViewport.voiLUT = layer.viewport.voiLUT;
    }

    // Module exports
    cornerstone.rendering.colorImage = renderColorImage;
    cornerstone.renderColorImage = renderColorImage;
    cornerstone.addColorLayer = addColorLayer;

}(cornerstone));

/**
 * This module is responsible for drawing a grayscale image
 */

(function (cornerstone) {

    "use strict";

    var grayscaleRenderCanvas = document.createElement('canvas');
    var grayscaleRenderCanvasContext;
    var grayscaleRenderCanvasData;

    var lastRenderedImageId;
    var lastRenderedViewport = {};

    function initializeGrayscaleRenderCanvas(image) {
        // Resize the canvas
        grayscaleRenderCanvas.width = image.width;
        grayscaleRenderCanvas.height = image.height;

        // NOTE - we need to fill the render canvas with white pixels since we control the luminance
        // using the alpha channel to improve rendering performance.
        grayscaleRenderCanvasContext = grayscaleRenderCanvas.getContext('2d');
        grayscaleRenderCanvasContext.fillStyle = 'white';
        grayscaleRenderCanvasContext.fillRect(0, 0, grayscaleRenderCanvas.width, grayscaleRenderCanvas.height);
        grayscaleRenderCanvasData = grayscaleRenderCanvasContext.getImageData(0, 0, image.width, image.height);
    }

    function lutMatches(a, b) {
        // if undefined, they are equal
        if (!a && !b) {
            return true;
        }
        // if one is undefined, not equal
        if (!a || !b) {
            return false;
        }
        // check the unique ids
        return (a.id === b.id)
    }

    function getLut(image, viewport, invalidated) {
        // if we have a cached lut and it has the right values, return it immediately
        if (image.lut !== undefined &&
            image.lut.windowCenter === viewport.voi.windowCenter &&
            image.lut.windowWidth === viewport.voi.windowWidth &&
            lutMatches(image.lut.modalityLUT, viewport.modalityLUT) &&
            lutMatches(image.lut.voiLUT, viewport.voiLUT) &&
            image.lut.invert === viewport.invert &&
            invalidated !== true) {
            return image.lut;
        }

        // lut is invalid or not present, regenerate it and cache it
        cornerstone.generateLut(image, viewport.voi.windowWidth, viewport.voi.windowCenter, viewport.invert, viewport.modalityLUT, viewport.voiLUT);
        image.lut.windowWidth = viewport.voi.windowWidth;
        image.lut.windowCenter = viewport.voi.windowCenter;
        image.lut.invert = viewport.invert;
        image.lut.voiLUT = viewport.voiLUT;
        image.lut.modalityLUT = viewport.modalityLUT;
        return image.lut;
    }

    function doesImageNeedToBeRendered(enabledElement, image) {
        if (image.imageId !== lastRenderedImageId ||
            lastRenderedViewport.windowCenter !== enabledElement.viewport.voi.windowCenter ||
            lastRenderedViewport.windowWidth !== enabledElement.viewport.voi.windowWidth ||
            lastRenderedViewport.invert !== enabledElement.viewport.invert ||
            lastRenderedViewport.rotation !== enabledElement.viewport.rotation ||
            lastRenderedViewport.hflip !== enabledElement.viewport.hflip ||
            lastRenderedViewport.vflip !== enabledElement.viewport.vflip ||
            lastRenderedViewport.modalityLUT !== enabledElement.viewport.modalityLUT ||
            lastRenderedViewport.voiLUT !== enabledElement.viewport.voiLUT
        ) {
            return true;
        }

        return false;
    }

    function getRenderCanvas(enabledElement, image, invalidated) {
        // apply the lut to the stored pixel data onto the render canvas

        if (doesImageNeedToBeRendered(enabledElement, image) === false && invalidated !== true) {
            return grayscaleRenderCanvas;
        }

        // If our render canvas does not match the size of this image reset it
        // NOTE: This might be inefficient if we are updating multiple images of different
        // sizes frequently.
        if (grayscaleRenderCanvas.width !== image.width || grayscaleRenderCanvas.height != image.height) {
            initializeGrayscaleRenderCanvas(image);
        }

        // get the lut to use
        var lut = getLut(image, enabledElement.viewport, invalidated);
        // gray scale image - apply the lut and put the resulting image onto the render canvas
        cornerstone.storedPixelDataToCanvasImageData(image, lut, grayscaleRenderCanvasData.data);
        grayscaleRenderCanvasContext.putImageData(grayscaleRenderCanvasData, 0, 0);
        return grayscaleRenderCanvas;
    }

    /**
     * API function to draw a grayscale image to a given enabledElement
     * @param enabledElement
     * @param invalidated - true if pixel data has been invaldiated and cached rendering should not be used
     */
    function renderGrayscaleImage(enabledElement, invalidated) {
        if (enabledElement === undefined) {
            throw "drawImage: enabledElement parameter must not be undefined";
        }

        var image = enabledElement.image;
        if (image === undefined) {
            throw "drawImage: image must be loaded before it can be drawn";
        }

        // get the canvas context and reset the transform
        var context = enabledElement.canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, 0, 0);

        // clear the canvas
        context.fillStyle = 'black';
        context.fillRect(0, 0, enabledElement.canvas.width, enabledElement.canvas.height);

        // turn off image smooth/interpolation if pixelReplication is set in the viewport
        if (enabledElement.viewport.pixelReplication === true) {
            context.imageSmoothingEnabled = false;
            context.mozImageSmoothingEnabled = false; // firefox doesn't support imageSmoothingEnabled yet
        } else {
            context.imageSmoothingEnabled = true;
            context.mozImageSmoothingEnabled = true;
        }

        // Save the canvas context state and apply the viewport properties
        cornerstone.setToPixelCoordinateSystem(enabledElement, context);

        var renderCanvas;
        if (enabledElement.options && enabledElement.options.renderer &&
            enabledElement.options.renderer.toLowerCase() === 'webgl') {
            // If this enabled element has the option set for WebGL, we should
            // user it as our renderer.
            renderCanvas = cornerstone.webGL.renderer.render(enabledElement);
        } else {
            // If no options are set we will retrieve the renderCanvas through the
            // normal Canvas rendering path
            renderCanvas = getRenderCanvas(enabledElement, image, invalidated);
        }

        // Draw the render canvas half the image size (because we set origin to the middle of the canvas above)
        context.drawImage(renderCanvas, 0, 0, image.width, image.height, 0, 0, image.width, image.height);

        lastRenderedImageId = image.imageId;
        lastRenderedViewport.windowCenter = enabledElement.viewport.voi.windowCenter;
        lastRenderedViewport.windowWidth = enabledElement.viewport.voi.windowWidth;
        lastRenderedViewport.invert = enabledElement.viewport.invert;
        lastRenderedViewport.rotation = enabledElement.viewport.rotation;
        lastRenderedViewport.hflip = enabledElement.viewport.hflip;
        lastRenderedViewport.vflip = enabledElement.viewport.vflip;
        lastRenderedViewport.modalityLUT = enabledElement.viewport.modalityLUT;
        lastRenderedViewport.voiLUT = enabledElement.viewport.voiLUT;
    }

    function addGrayscaleLayer(layer, invalidated) {
        if (layer === undefined) {
            throw "drawImage: layer parameter must not be undefined";
        }

        var image = layer.image;
        if (image === undefined) {
            throw "drawImage: image must be loaded before it can be drawn";
        }


        layer.canvas = getRenderCanvas(layer, image, invalidated);
        var context = layer.canvas.getContext('2d');

        // turn off image smooth/interpolation if pixelReplication is set in the viewport
        if (layer.viewport.pixelReplication === true) {
            context.imageSmoothingEnabled = false;
            context.mozImageSmoothingEnabled = false; // firefox doesn't support imageSmoothingEnabled yet
        } else {
            context.imageSmoothingEnabled = true;
            context.mozImageSmoothingEnabled = true;
        }

        lastRenderedImageId = image.imageId;
        lastRenderedViewport.windowCenter = layer.viewport.voi.windowCenter;
        lastRenderedViewport.windowWidth = layer.viewport.voi.windowWidth;
        lastRenderedViewport.invert = layer.viewport.invert;
        lastRenderedViewport.rotation = layer.viewport.rotation;
        lastRenderedViewport.hflip = layer.viewport.hflip;
        lastRenderedViewport.vflip = layer.viewport.vflip;
        lastRenderedViewport.modalityLUT = layer.viewport.modalityLUT;
        lastRenderedViewport.voiLUT = layer.viewport.voiLUT;
    }

    // Module exports
    cornerstone.addGrayscaleLayer = addGrayscaleLayer;
    cornerstone.rendering.grayscaleImage = renderGrayscaleImage;
    cornerstone.renderGrayscaleImage = renderGrayscaleImage;

}(cornerstone));

/**
 * This module is responsible for drawing a grayscale imageß
 */

(function (cornerstone) {

    "use strict";

    // Render a color or grayscale image with support for multi-layered elements.
    function renderImage(enabledElement, invalidated) {
        var image = enabledElement.image;
        var layers = enabledElement.layers || [];

        // We aren't checking if needsRedraw is true because once this
        // method is called the image WILL BE rendered.
        if (!enabledElement.canvas || !(enabledElement.image || layers.length)) {
            return;
        }

        var start = new Date();

        if (layers && layers.length) {
            cornerstone.drawCompositeImage(enabledElement, invalidated);
        } else if (image) {
            var render = image.render;

            if (!render) {
                render = image.color ? cornerstone.renderColorImage : cornerstone.renderGrayscaleImage;
            }

            render(enabledElement, invalidated);
        }

        var end = new Date();
        var diff = end - start;
        var context = enabledElement.canvas.getContext('2d');

        var eventData = {
            viewport: enabledElement.viewport,
            element: enabledElement.element,
            image: enabledElement.image,
            layers: enabledElement.layers,
            enabledElement: enabledElement,
            canvasContext: context,
            renderTimeInMs: diff
        };

        $(enabledElement.element).trigger("CornerstoneImageRendered", eventData);
    }

    // Module exports
    cornerstone.renderImage = renderImage;

}(cornerstone));

/**
 * This module is responsible for drawing an image to an enabled elements canvas element
 */

(function (cornerstone) {

    "use strict";

    /**
     * API function to draw a standard web image (PNG, JPG) to an enabledImage
     *
     * @param enabledElement
     * @param invalidated - true if pixel data has been invaldiated and cached rendering should not be used
     */
    function renderWebImage(enabledElement, invalidated) {

        if (enabledElement === undefined) {
            throw "drawImage: enabledElement parameter must not be undefined";
        }
        var image = enabledElement.image;
        if (image === undefined) {
            throw "drawImage: image must be loaded before it can be drawn";
        }

        // get the canvas context and reset the transform
        var context = enabledElement.canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, 0, 0);

        // clear the canvas
        context.fillStyle = 'black';
        context.fillRect(0, 0, enabledElement.canvas.width, enabledElement.canvas.height);

        // turn off image smooth/interpolation if pixelReplication is set in the viewport
        if (enabledElement.viewport.pixelReplication === true) {
            context.imageSmoothingEnabled = false;
            context.mozImageSmoothingEnabled = false; // firefox doesn't support imageSmoothingEnabled yet
        } else {
            context.imageSmoothingEnabled = true;
            context.mozImageSmoothingEnabled = true;
        }

        // save the canvas context state and apply the viewport properties
        cornerstone.setToPixelCoordinateSystem(enabledElement, context);

        // if the viewport ww/wc and invert all match the initial state of the image, we can draw the image
        // directly.  If any of those are changed, we call renderColorImage() to apply the lut
        if (enabledElement.viewport.voi.windowWidth === enabledElement.image.windowWidth &&
            enabledElement.viewport.voi.windowCenter === enabledElement.image.windowCenter &&
            enabledElement.viewport.invert === false) {
            context.drawImage(image.getImage(), 0, 0, image.width, image.height, 0, 0, image.width, image.height);
        } else {
            cornerstone.renderColorImage(enabledElement, invalidated);
        }

    }

    // Module exports
    cornerstone.rendering.webImage = renderWebImage;
    cornerstone.renderWebImage = renderWebImage;

}(cornerstone));
/**
 */
(function (cornerstone) {

    "use strict";

    /**
     * Resets the viewport to the default settings
     *
     * @param element
     */
    function reset(element) {
        var enabledElement = cornerstone.getEnabledElement(element);
        var defaultViewport = cornerstone.internal.getDefaultViewport(enabledElement.canvas, enabledElement.image);
        enabledElement.viewport = defaultViewport;
        cornerstone.updateImage(element);
    }

    cornerstone.reset = reset;
}(cornerstone));

/**
 * This module is responsible for enabling an element to display images with cornerstone
 */
(function (cornerstone) {

    "use strict";

    function setCanvasSize(element, canvas) {
        // the device pixel ratio is 1.0 for normal displays and > 1.0
        // for high DPI displays like Retina
        /*

        This functionality is disabled due to buggy behavior on systems with mixed DPI's.  If the canvas
        is created on a display with high DPI (e.g. 2.0) and then the browser window is dragged to
        a different display with a different DPI (e.g. 1.0), the canvas is not recreated so the pageToPixel
        produces incorrect results.  I couldn't find any way to determine when the DPI changed other than
        by polling which is not very clean.  If anyone has any ideas here, please let me know, but for now
        we will disable this functionality.  We may want
        to add a mechanism to optionally enable this functionality if we can determine it is safe to do
        so (e.g. iPad or iPhone or perhaps enumerate the displays on the system.  I am choosing
        to be cautious here since I would rather not have bug reports or safety issues related to this
        scenario.

        var devicePixelRatio = window.devicePixelRatio;
        if(devicePixelRatio === undefined) {
            devicePixelRatio = 1.0;
        }
        */

        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
        canvas.style.width = element.clientWidth + "px";
        canvas.style.height = element.clientHeight + "px";
    }

    /**
     * resizes an enabled element and optionally fits the image to window
     * @param element
     * @param fitToWindow true to refit, false to leave viewport parameters as they are
     */
    function resize(element, fitToWindow) {

        var enabledElement = cornerstone.getEnabledElement(element);

        setCanvasSize(element, enabledElement.canvas);

        var eventData = {
            element: element
        };

        $(element).trigger("CornerstoneElementResized", eventData);

        if (enabledElement.image === undefined) {
            return;
        }

        if (fitToWindow === true) {
            cornerstone.fitToWindow(element);
        } else {
            cornerstone.updateImage(element);
        }
    }

    // module/private exports
    cornerstone.resize = resize;

}(cornerstone));

/**
 * This module contains a function that will set the canvas context to the pixel coordinates system
 * making it easy to draw geometry on the image
 */

(function (cornerstone) {

    "use strict";

    /**
     * Sets the canvas context transformation matrix to the pixel coordinate system.  This allows
     * geometry to be driven using the canvas context using coordinates in the pixel coordinate system
     * @param ee
     * @param context
     * @param scale optional scaler to apply
     */
    function setToPixelCoordinateSystem(enabledElement, context, scale) {
        if (enabledElement === undefined) {
            throw "setToPixelCoordinateSystem: parameter enabledElement must not be undefined";
        }
        if (context === undefined) {
            throw "setToPixelCoordinateSystem: parameter context must not be undefined";
        }

        var transform = cornerstone.internal.calculateTransform(enabledElement, scale);
        context.setTransform(transform.m[0], transform.m[1], transform.m[2], transform.m[3], transform.m[4], transform.m[5]);
    }

    // Module exports
    cornerstone.setToPixelCoordinateSystem = setToPixelCoordinateSystem;
}(cornerstone));
/**
 * This module contains functions to deal with getting and setting the viewport for an enabled element
 */
(function (cornerstone) {

    "use strict";

    /**
     * Sets the viewport for an element and corrects invalid values
     *
     * @param element - DOM element of the enabled element
     * @param viewport - Object containing the viewport properties
     * @returns {*}
     */
    function setViewport(element, viewport) {

        var enabledElement = cornerstone.getEnabledElement(element);

        enabledElement.viewport.scale = viewport.scale;
        enabledElement.viewport.translation.x = viewport.translation.x;
        enabledElement.viewport.translation.y = viewport.translation.y;
        enabledElement.viewport.voi.windowWidth = viewport.voi.windowWidth;
        enabledElement.viewport.voi.windowCenter = viewport.voi.windowCenter;
        enabledElement.viewport.invert = viewport.invert;
        enabledElement.viewport.pixelReplication = viewport.pixelReplication;
        enabledElement.viewport.rotation = viewport.rotation;
        enabledElement.viewport.hflip = viewport.hflip;
        enabledElement.viewport.vflip = viewport.vflip;
        enabledElement.viewport.modalityLUT = viewport.modalityLUT;
        enabledElement.viewport.voiLUT = viewport.voiLUT;

        // prevent window width from being too small (note that values close to zero are valid and can occur with
        // PET images in particular)
        if (enabledElement.viewport.voi.windowWidth < 0.000001) {
            enabledElement.viewport.voi.windowWidth = 0.000001;
        }
        // prevent scale from getting too small
        if (enabledElement.viewport.scale < 0.0001) {
            enabledElement.viewport.scale = 0.25;
        }

        if (enabledElement.viewport.rotation === 360 || enabledElement.viewport.rotation === -360) {
            enabledElement.viewport.rotation = 0;
        }

        // Force the image to be updated since the viewport has been modified
        cornerstone.updateImage(element);
    }


    // module/private exports
    cornerstone.setViewport = setViewport;

}(cornerstone));

/**
 * This module contains a function to immediately redraw an image
 */
(function (cornerstone) {

    "use strict";

    /**
     * Forces the image to be updated/redrawn for the specified enabled element
     * @param element
     */
    function updateImage(element, invalidated) {
        var enabledElement = cornerstone.getEnabledElement(element);

        if (!enabledElement.image && !enabledElement.layers) {
            throw "updateImage: image has not been loaded yet";
        }

        cornerstone.drawImage(enabledElement, invalidated);
    }

    // module exports
    cornerstone.updateImage = updateImage;

}(cornerstone));
(function (cornerstone) {

    "use strict";

    if (!cornerstone.webGL) {
        cornerstone.webGL = {};
    }

    /**
     * Creates and compiles a shader.
     *
     * @param {!WebGLRenderingContext} gl The WebGL Context.
     * @param {string} shaderSource The GLSL source code for the shader.
     * @param {number} shaderType The type of shader, VERTEX_SHADER or FRAGMENT_SHADER.
     *     
     * @return {!WebGLShader} The shader.
     */
    function compileShader(gl, shaderSource, shaderType) {

        // Create the shader object
        var shader = gl.createShader(shaderType);

        // Set the shader source code.
        gl.shaderSource(shader, shaderSource);

        // Compile the shader
        gl.compileShader(shader);

        // Check if it compiled
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!success && !gl.isContextLost()) {
            // Something went wrong during compilation; get the error
            var infoLog = gl.getShaderInfoLog(shader);
            console.error("Could not compile shader:\n" + infoLog);
        }

        return shader;
    }

    /**
     * Creates a program from 2 shaders.
     *
     * @param {!WebGLRenderingContext) gl The WebGL context.
     * @param {!WebGLShader} vertexShader A vertex shader.
     * @param {!WebGLShader} fragmentShader A fragment shader.
     * @return {!WebGLProgram} A program.
     */
    function createProgram(gl, vertexShader, fragmentShader) {

        // create a program.
        var program = gl.createProgram();

        // attach the shaders.
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        // link the program.
        gl.linkProgram(program);

        // Check if it linked.
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!success && !gl.isContextLost()) {
            // something went wrong with the link
            var infoLog = gl.getProgramInfoLog(program);
            console.error("WebGL program filed to link:\n" + infoLog);
        }

        return program;
    }

    /**
     * Creates a program from 2 shaders source (Strings)
     * @param  {!WebGLRenderingContext} gl              The WebGL context.
     * @param  {!WebGLShader} vertexShaderSrc   Vertex shader string
     * @param  {!WebGLShader} fragShaderSrc Fragment shader string
     * @return {!WebGLProgram}                 A program
     */
    function createProgramFromString(gl, vertexShaderSrc, fragShaderSrc) {
        var vertexShader = compileShader(gl, vertexShaderSrc, gl.VERTEX_SHADER);
        var fragShader = compileShader(gl, fragShaderSrc, gl.FRAGMENT_SHADER);
        return createProgram(gl, vertexShader, fragShader);
    }

    cornerstone.webGL.createProgramFromString = createProgramFromString;

}(cornerstone));

(function (cornerstone) {

    "use strict";

    if (!cornerstone.webGL) {
        cornerstone.webGL = {};
    }

    var renderCanvas = document.createElement('canvas');
    var renderCanvasContext;
    var renderCanvasData;
    var gl;
    var programs;
    var shader;
    var texCoordBuffer, positionBuffer;
    cornerstone.webGL.isWebGLInitialized = false;

    function getRenderCanvas() {
        return renderCanvas;
    }

    function initShaders() {
        for (var id in cornerstone.webGL.shaders) {
            //console.log("WEBGL: Loading shader", id);
            var shader = cornerstone.webGL.shaders[id];
            shader.attributes = {};
            shader.uniforms = {};
            shader.vert = cornerstone.webGL.vertexShader;

            shader.program = cornerstone.webGL.createProgramFromString(gl, shader.vert, shader.frag);

            shader.attributes.texCoordLocation = gl.getAttribLocation(shader.program, "a_texCoord");
            gl.enableVertexAttribArray(shader.attributes.texCoordLocation);

            shader.attributes.positionLocation = gl.getAttribLocation(shader.program, "a_position");
            gl.enableVertexAttribArray(shader.attributes.positionLocation);

            shader.uniforms.resolutionLocation = gl.getUniformLocation(shader.program, "u_resolution");
        }
    }

    function initRenderer() {
        if (cornerstone.webGL.isWebGLInitialized === true) {
            //console.log("WEBGL Renderer already initialized");
            return;
        }

        if (initWebGL(renderCanvas)) {
            initBuffers();
            initShaders();
            //console.log("WEBGL Renderer initialized!");
            cornerstone.webGL.isWebGLInitialized = true;
        }
    }

    function updateRectangle(gl, width, height) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            width, height,
            0, height,
            width, 0,
            0, 0
        ]), gl.STATIC_DRAW);
    }

    function handleLostContext(event) {
        event.preventDefault();
        console.warn('WebGL Context Lost!');
    }

    function handleRestoredContext(event) {
        event.preventDefault();
        cornerstone.webGL.isWebGLInitialized = false;
        cornerstone.webGL.textureCache.purgeCache();
        initRenderer();
        //console.log('WebGL Context Restored.');
    }

    function initWebGL(canvas) {

        gl = null;
        try {
            // Try to grab the standard context. If it fails, fallback to experimental.
            var options = {
                preserveDrawingBuffer: true, // preserve buffer so we can copy to display canvas element
            };

            // ---------------- Testing purposes ------------- 
            if (cornerstone.webGL.debug === true && WebGLDebugUtils) {
                renderCanvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(renderCanvas);
            }
            // ---------------- Testing purposes -------------

            gl = canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options);

            // Set up event listeners for context lost / context restored
            canvas.removeEventListener("webglcontextlost", handleLostContext, false);
            canvas.addEventListener("webglcontextlost", handleLostContext, false);

            canvas.removeEventListener("webglcontextrestored", handleRestoredContext, false);
            canvas.addEventListener("webglcontextrestored", handleRestoredContext, false);

        } catch (error) {
            throw "Error creating WebGL context";
        }

        // If we don't have a GL context, give up now
        if (!gl) {
            console.error("Unable to initialize WebGL. Your browser may not support it.");
            gl = null;
        }
        return gl;
    }

    function getImageDataType(image) {
        if (image.color) {
            return 'rgb';
        }

        var datatype = 'int';
        if (image.minPixelValue >= 0) {
            datatype = 'u' + datatype;
        }

        if (image.maxPixelValue > 255) {
            datatype += '16';
        } else {
            datatype += '8';
        }
        return datatype;
    }

    function getShaderProgram(image) {

        var datatype = getImageDataType(image);
        // We need a mechanism for
        // choosing the shader based on the image datatype
        // console.log("Datatype: " + datatype);
        if (cornerstone.webGL.shaders.hasOwnProperty(datatype)) {
            return cornerstone.webGL.shaders[datatype];
        }

        var shader = cornerstone.webGL.shaders.rgb;
        return shader;
    }

    function getImageTexture(image) {
        var imageTexture = cornerstone.webGL.textureCache.getImageTexture(image.imageId);
        if (!imageTexture) {
            //console.log("Generating texture for imageid: ", image.imageId);
            imageTexture = generateTexture(image);
            cornerstone.webGL.textureCache.putImageTexture(image, imageTexture);
        }
        return imageTexture.texture;

    }

    function generateTexture(image) {
        var TEXTURE_FORMAT = {
            uint8: gl.LUMINANCE,
            int8: gl.LUMINANCE_ALPHA,
            uint16: gl.LUMINANCE_ALPHA,
            int16: gl.RGB,
            rgb: gl.RGB
        };

        var TEXTURE_BYTES = {
            int8: 1, // Luminance
            uint16: 2, // Luminance + Alpha
            int16: 3, // RGB
            rgb: 3 // RGB
        };

        var imageDataType = getImageDataType(image);
        var format = TEXTURE_FORMAT[imageDataType];

        // GL texture configuration
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

        var imageData = cornerstone.webGL.dataUtilities[imageDataType].storedPixelDataToImageData(image, image.width, image.height);

        gl.texImage2D(gl.TEXTURE_2D, 0, format, image.width, image.height, 0, format, gl.UNSIGNED_BYTE, imageData);

        // Calculate the size in bytes of this image in memory
        var sizeInBytes = image.width * image.height * TEXTURE_BYTES[imageDataType];
        var imageTexture = {
            texture: texture,
            sizeInBytes: sizeInBytes
        };
        return imageTexture;

    }

    function initBuffers() {
        positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            1, 1,
            0, 1,
            1, 0,
            0, 0
        ]), gl.STATIC_DRAW);


        texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0,
        ]), gl.STATIC_DRAW);
    }

    function renderQuad(shader, parameters, texture, width, height) {
        gl.clearColor(1.0, 0.0, 0.0, 1.0);
        gl.viewport(0, 0, width, height);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(shader.program);

        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.vertexAttribPointer(shader.attributes.texCoordLocation, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(shader.attributes.positionLocation, 2, gl.FLOAT, false, 0, 0);

        for (var key in parameters) {
            var uniformLocation = gl.getUniformLocation(shader.program, key);
            if (!uniformLocation) {
                throw "Could not access location for uniform: " + key;
            }

            var uniform = parameters[key];

            var type = uniform.type;
            var value = uniform.value;

            if (type == "i") {
                gl.uniform1i(uniformLocation, value);
            } else if (type == "f") {
                gl.uniform1f(uniformLocation, value);
            } else if (type == "2f") {
                gl.uniform2f(uniformLocation, value[0], value[1]);
            }
        }

        updateRectangle(gl, width, height);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    }

    function render(enabledElement) {
        // Resize the canvas
        var image = enabledElement.image;
        renderCanvas.width = image.width;
        renderCanvas.height = image.height;

        var viewport = enabledElement.viewport;

        // Render the current image
        var shader = getShaderProgram(image);
        var texture = getImageTexture(image);
        var parameters = {
            "u_resolution": {
                type: "2f",
                value: [image.width, image.height]
            },
            "wc": {
                type: "f",
                value: viewport.voi.windowCenter
            },
            "ww": {
                type: "f",
                value: viewport.voi.windowWidth
            },
            "slope": {
                type: "f",
                value: image.slope
            },
            "intercept": {
                type: "f",
                value: image.intercept
            },
            //"minPixelValue": { type: "f", value: image.minPixelValue },
            "invert": {
                type: "i",
                value: viewport.invert ? 1 : 0
            },
        };
        renderQuad(shader, parameters, texture, image.width, image.height);

        return renderCanvas;
    }

    function isWebGLAvailable() {
        // Adapted from
        // http://stackoverflow.com/questions/9899807/three-js-detect-webgl-support-and-fallback-to-regular-canvas

        var options = {
            failIfMajorPerformanceCaveat: true
        };

        try {
            var canvas = document.createElement("canvas");
            return !!
                window.WebGLRenderingContext &&
                (canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options));
        } catch (e) {
            return false;
        }
    }

    cornerstone.webGL.renderer = {
        render: render,
        initRenderer: initRenderer,
        getRenderCanvas: getRenderCanvas,
        isWebGLAvailable: isWebGLAvailable
    };

}(cornerstone));


(function (cornerstone) {

    "use strict";

    if (!cornerstone.webGL) {
        cornerstone.webGL = {};
    }

    if (!cornerstone.webGL.shaders) {
        cornerstone.webGL.shaders = {};
    }

    if (!cornerstone.webGL.dataUtilities) {
        cornerstone.webGL.dataUtilities = {};
    }

    // Pack int16 into three uint8 channels (r, g, b)
    var shader = {};

    function storedPixelDataToImageData(image) {

        // Transfer image data to alpha and luminance channels of WebGL texture
        // Credit to @jpambrun and @fernandojsg

        // Pack int16 into three uint8 channels (r, g, b)
        var pixelData = image.getPixelData();
        var numberOfChannels = 3;
        var data = new Uint8Array(image.width * image.height * numberOfChannels);
        var offset = 0;

        for (var i = 0; i < pixelData.length; i++) {
            var val = Math.abs(pixelData[i]);
            data[offset++] = parseInt(val & 0xFF, 10);
            data[offset++] = parseInt(val >> 8, 10);
            data[offset++] = pixelData[i] < 0 ? 0 : 1; // 0 For negative, 1 for positive
        }
        return data;
    }

    cornerstone.webGL.dataUtilities.int16 = {
        storedPixelDataToImageData: storedPixelDataToImageData
    };

    shader.frag = 'precision mediump float;' +
        'uniform sampler2D u_image;' +
        'uniform float ww;' +
        'uniform float wc;' +
        'uniform float slope;' +
        'uniform float intercept;' +
        'uniform int invert;' +
        'varying vec2 v_texCoord;' +

        'void main() {' +
        // Get texture
        'vec4 color = texture2D(u_image, v_texCoord);' +

        // Calculate luminance from packed texture
        'float intensity = color.r*256.0 + color.g*65536.0;' +

        'if (color.b == 0.0)' +
        'intensity = -intensity;' +

        // Rescale based on slope and window settings
        'intensity = intensity * slope + intercept;' +
        'float center0 = wc - 0.5;' +
        'float width0 = max(ww, 1.0);' +
        'intensity = (intensity - center0) / width0 + 0.5;' +

        // Clamp intensity
        'intensity = clamp(intensity, 0.0, 1.0);' +

        // RGBA output
        'gl_FragColor = vec4(intensity, intensity, intensity, 1.0);' +

        // Apply any inversion necessary
        'if (invert == 1)' +
        'gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;' +
        '}';

    cornerstone.webGL.shaders.int16 = shader;

}(cornerstone));
(function (cornerstone) {

    "use strict";

    if (!cornerstone.webGL) {
        cornerstone.webGL = {};
    }

    if (!cornerstone.webGL.shaders) {
        cornerstone.webGL.shaders = {};
    }

    if (!cornerstone.webGL.dataUtilities) {
        cornerstone.webGL.dataUtilities = {};
    }

    var shader = {};

    function storedPixelDataToImageData(image) {
        // Transfer image data to alpha channel of WebGL texture
        // Store data in Uint8Array
        var pixelData = image.getPixelData();
        var numberOfChannels = 2;
        var data = new Uint8Array(image.width * image.height * numberOfChannels);
        var offset = 0;

        for (var i = 0; i < pixelData.length; i++) {
            data[offset++] = parseInt(pixelData[i], 10);
            data[offset++] = pixelData[i] < 0 ? 0 : 1; // 0 For negative, 1 for positive
        }
        return data;
    }

    cornerstone.webGL.dataUtilities.int8 = {
        storedPixelDataToImageData: storedPixelDataToImageData
    };

    shader.frag = 'precision mediump float;' +
        'uniform sampler2D u_image;' +
        'uniform float ww;' +
        'uniform float wc;' +
        'uniform float slope;' +
        'uniform float intercept;' +
        'uniform float minPixelValue;' +
        'uniform int invert;' +
        'varying vec2 v_texCoord;' +

        'void main() {' +
        // Get texture
        'vec4 color = texture2D(u_image, v_texCoord);' +

        // Calculate luminance from packed texture
        'float intensity = color.r*256.;' +

        'if (color.a == 0.0)' +
        'intensity = -intensity;' +

        // Rescale based on slope and window settings
        'intensity = intensity * slope + intercept;' +
        'float center0 = wc - 0.5;' +
        'float width0 = max(ww, 1.0);' +
        'intensity = (intensity - center0) / width0 + 0.5;' +

        // Clamp intensity
        'intensity = clamp(intensity, 0.0, 1.0);' +

        // RGBA output
        'gl_FragColor = vec4(intensity, intensity, intensity, 1.0);' +

        // Apply any inversion necessary
        'if (invert == 1)' +
        'gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;' +
        '}';

    cornerstone.webGL.shaders.int8 = shader;


}(cornerstone));
(function (cornerstone) {

    "use strict";

    if (!cornerstone.webGL) {
        cornerstone.webGL = {};
    }

    if (!cornerstone.webGL.shaders) {
        cornerstone.webGL.shaders = {};
    }

    if (!cornerstone.webGL.dataUtilities) {
        cornerstone.webGL.dataUtilities = {};
    }

    // Pack RGB images into a 3-channel RGB texture
    var shader = {};

    function storedPixelDataToImageData(image) {
        var minPixelValue = image.minPixelValue;
        var canvasImageDataIndex = 0;
        var storedPixelDataIndex = 0;
        // Only 3 channels, since we use WebGL's RGB texture format
        var numStoredPixels = image.width * image.height * 4;
        var numOutputPixels = image.width * image.height * 3;
        var storedPixelData = image.getPixelData();
        var data = new Uint8Array(numOutputPixels);

        // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
        // We have a special code path for this case that improves performance.  Thanks to @jpambrun for this enhancement
        if (minPixelValue < 0) {
            while (storedPixelDataIndex < numStoredPixels) {
                data[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++] + (-minPixelValue); // red
                data[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++] + (-minPixelValue); // green
                data[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++] + (-minPixelValue); // blue
                storedPixelDataIndex += 1; // The stored pixel data has 4 channels
            }
        } else {
            while (storedPixelDataIndex < numStoredPixels) {
                data[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++]; // red
                data[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++]; // green
                data[canvasImageDataIndex++] = storedPixelData[storedPixelDataIndex++]; // blue
                storedPixelDataIndex += 1; // The stored pixel data has 4 channels
            }
        }
        return data;
    }

    cornerstone.webGL.dataUtilities.rgb = {
        storedPixelDataToImageData: storedPixelDataToImageData
    };

    shader.frag = 'precision mediump float;' +
        'uniform sampler2D u_image;' +
        'uniform float ww;' +
        'uniform float wc;' +
        'uniform float slope;' +
        'uniform float intercept;' +
        'uniform float minPixelValue;' +
        'uniform int invert;' +
        'varying vec2 v_texCoord;' +

        'void main() {' +

        // Get texture
        'vec3 color = texture2D(u_image, v_texCoord).xyz;' +

        // Rescale based on slope and intercept 
        'color = color * 256.0 * slope + intercept;' +

        // Apply window settings
        'float center0 = wc - 0.5 - minPixelValue;' +
        'float width0 = max(ww, 1.0);' +
        'color = (color - center0) / width0 + 0.5;' +

        // RGBA output
        'gl_FragColor = vec4(color, 1);' +

        // Apply any inversion necessary
        'if (invert == 1)' +
        'gl_FragColor.rgb = 1. - gl_FragColor.rgb;' +
        '}';

    cornerstone.webGL.shaders.rgb = shader;

}(cornerstone));
(function (cornerstone) {

    "use strict";

    if (!cornerstone.webGL) {
        cornerstone.webGL = {};
    }

    if (!cornerstone.webGL.shaders) {
        cornerstone.webGL.shaders = {};
    }

    if (!cornerstone.webGL.dataUtilities) {
        cornerstone.webGL.dataUtilities = {};
    }

    // For uint16 pack uint16 into two uint8 channels (r and a)
    var shader = {};

    function storedPixelDataToImageData(image) {

        // Transfer image data to alpha and luminance channels of WebGL texture
        // Credit to @jpambrun and @fernandojsg

        // Pack uint16 into two uint8 channels (r and a)
        var pixelData = image.getPixelData();
        var numberOfChannels = 2;
        var data = new Uint8Array(image.width * image.height * numberOfChannels);
        var offset = 0;

        for (var i = 0; i < pixelData.length; i++) {
            var val = pixelData[i];
            data[offset++] = parseInt(val & 0xFF, 10);
            data[offset++] = parseInt(val >> 8, 10);
        }
        return data;
    }

    cornerstone.webGL.dataUtilities.uint16 = {
        storedPixelDataToImageData: storedPixelDataToImageData
    };

    shader.frag = 'precision mediump float;' +
        'uniform sampler2D u_image;' +
        'uniform float ww;' +
        'uniform float wc;' +
        'uniform float slope;' +
        'uniform float intercept;' +
        'uniform int invert;' +
        'varying vec2 v_texCoord;' +

        'void main() {' +
        // Get texture
        'vec4 color = texture2D(u_image, v_texCoord);' +

        // Calculate luminance from packed texture
        'float intensity = color.r*256.0 + color.a*65536.0;' +

        // Rescale based on slope and window settings
        'intensity = intensity * slope + intercept;' +
        'float center0 = wc - 0.5;' +
        'float width0 = max(ww, 1.0);' +
        'intensity = (intensity - center0) / width0 + 0.5;' +

        // Clamp intensity
        'intensity = clamp(intensity, 0.0, 1.0);' +

        // RGBA output
        'gl_FragColor = vec4(intensity, intensity, intensity, 1.0);' +

        // Apply any inversion necessary
        'if (invert == 1)' +
        'gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;' +
        '}';

    cornerstone.webGL.shaders.uint16 = shader;

}(cornerstone));
(function (cornerstone) {

    "use strict";

    if (!cornerstone.webGL) {
        cornerstone.webGL = {};
    }

    if (!cornerstone.webGL.shaders) {
        cornerstone.webGL.shaders = {};
    }

    if (!cornerstone.webGL.dataUtilities) {
        cornerstone.webGL.dataUtilities = {};
    }

    var shader = {};

    function storedPixelDataToImageData(image) {
        // Transfer image data to alpha channel of WebGL texture
        // Store data in Uuint8Array
        var pixelData = image.getPixelData();
        var data = new Uint8Array(pixelData.length);
        for (var i = 0; i < pixelData.length; i++) {
            data[i] = parseInt(pixelData[i], 10);
        }
        return data;
    }

    cornerstone.webGL.dataUtilities.uint8 = {
        storedPixelDataToImageData: storedPixelDataToImageData
    };

    shader.frag = 'precision mediump float;' +
        'uniform sampler2D u_image;' +
        'uniform float ww;' +
        'uniform float wc;' +
        'uniform float slope;' +
        'uniform float intercept;' +
        //'uniform float minPixelValue;' +
        'uniform int invert;' +
        'varying vec2 v_texCoord;' +

        'void main() {' +
        // Get texture
        'vec4 color = texture2D(u_image, v_texCoord);' +

        // Calculate luminance from packed texture
        'float intensity = color.r*256.0;' +

        // Rescale based on slope and window settings
        'intensity = intensity * slope + intercept;' +
        'float center0 = wc - 0.5;' +
        'float width0 = max(ww, 1.0);' +
        'intensity = (intensity - center0) / width0 + 0.5;' +

        // Clamp intensity
        'intensity = clamp(intensity, 0.0, 1.0);' +

        // RGBA output
        'gl_FragColor = vec4(intensity, intensity, intensity, 1.0);' +

        // Apply any inversion necessary
        'if (invert == 1)' +
        'gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;' +
        '}';

    cornerstone.webGL.shaders.uint8 = shader;


}(cornerstone));
/**
 * This module deals with caching image textures in VRAM for WebGL
 */

(function (cornerstone) {

    "use strict";

    var imageCache = {};

    var cachedImages = [];

    var maximumSizeInBytes = 1024 * 1024 * 256; // 256 MB
    var cacheSizeInBytes = 0;

    function setMaximumSizeBytes(numBytes) {
        if (numBytes === undefined) {
            throw "setMaximumSizeBytes: parameter numBytes must not be undefined";
        }
        if (numBytes.toFixed === undefined) {
            throw "setMaximumSizeBytes: parameter numBytes must be a number";
        }

        maximumSizeInBytes = numBytes;
        purgeCacheIfNecessary();
    }

    function purgeCacheIfNecessary() {
        // if max cache size has not been exceeded, do nothing
        if (cacheSizeInBytes <= maximumSizeInBytes) {
            return;
        }

        // cache size has been exceeded, create list of images sorted by timeStamp
        // so we can purge the least recently used image
        function compare(a, b) {
            if (a.timeStamp > b.timeStamp) {
                return -1;
            }
            if (a.timeStamp < b.timeStamp) {
                return 1;
            }
            return 0;
        }
        cachedImages.sort(compare);

        // remove images as necessary
        while (cacheSizeInBytes > maximumSizeInBytes) {
            var lastCachedImage = cachedImages[cachedImages.length - 1];
            cacheSizeInBytes -= lastCachedImage.sizeInBytes;
            delete imageCache[lastCachedImage.imageId];
            cachedImages.pop();
            $(cornerstone).trigger('CornerstoneWebGLTextureRemoved', {
                imageId: lastCachedImage.imageId
            });
        }

        var cacheInfo = cornerstone.imageCache.getCacheInfo();
        console.log('CornerstoneWebGLTextureCacheFull');
        $(cornerstone).trigger('CornerstoneWebGLTextureCacheFull', cacheInfo);
    }

    function putImageTexture(image, imageTexture) {
        var imageId = image.imageId;
        if (image === undefined) {
            throw "putImageTexture: image must not be undefined";
        }

        if (imageId === undefined) {
            throw "putImageTexture: imageId must not be undefined";
        }

        if (imageTexture === undefined) {
            throw "putImageTexture: imageTexture must not be undefined";
        }

        if (imageCache.hasOwnProperty(imageId) === true) {
            throw "putImageTexture: imageId already in cache";
        }

        var cachedImage = {
            imageId: imageId,
            imageTexture: imageTexture,
            timeStamp: new Date(),
            sizeInBytes: imageTexture.sizeInBytes
        };

        imageCache[imageId] = cachedImage;
        cachedImages.push(cachedImage);

        if (imageTexture.sizeInBytes === undefined) {
            throw "putImageTexture: imageTexture does not have sizeInBytes property or";
        }
        if (imageTexture.sizeInBytes.toFixed === undefined) {
            throw "putImageTexture: imageTexture.sizeInBytes is not a number";
        }
        cacheSizeInBytes += cachedImage.sizeInBytes;
        purgeCacheIfNecessary();
    }

    function getImageTexture(imageId) {
        if (imageId === undefined) {
            throw "getImageTexture: imageId must not be undefined";
        }
        var cachedImage = imageCache[imageId];
        if (cachedImage === undefined) {
            return undefined;
        }

        // bump time stamp for cached image
        cachedImage.timeStamp = new Date();
        return cachedImage.imageTexture;
    }

    function removeImageTexture(imageId) {
        if (imageId === undefined) {
            throw "removeImageTexture: imageId must not be undefined";
        }
        var cachedImage = imageCache[imageId];
        if (cachedImage === undefined) {
            throw "removeImageTexture: imageId must not be undefined";
        }
        cachedImages.splice(cachedImages.indexOf(cachedImage), 1);
        cacheSizeInBytes -= cachedImage.sizeInBytes;
        delete imageCache[imageId];

        return cachedImage.imageTexture;
    }

    function getCacheInfo() {
        return {
            maximumSizeInBytes: maximumSizeInBytes,
            cacheSizeInBytes: cacheSizeInBytes,
            numberOfImagesCached: cachedImages.length
        };
    }

    function purgeCache() {
        while (cachedImages.length > 0) {
            var removedCachedImage = cachedImages.pop();
            delete imageCache[removedCachedImage.imageId];
        }
        cacheSizeInBytes = 0;
    }

    // module exports
    cornerstone.webGL.textureCache = {
        putImageTexture: putImageTexture,
        getImageTexture: getImageTexture,
        removeImageTexture: removeImageTexture,
        setMaximumSizeBytes: setMaximumSizeBytes,
        getCacheInfo: getCacheInfo,
        purgeCache: purgeCache,
        cachedImages: cachedImages
    };

}(cornerstone));

(function (cornerstone) {

    "use strict";

    if (!cornerstone.webGL) {
        cornerstone.webGL = {};
    }

    cornerstone.webGL.vertexShader = 'attribute vec2 a_position;' +
        'attribute vec2 a_texCoord;' +
        'uniform vec2 u_resolution;' +
        'varying vec2 v_texCoord;' +
        'void main() {' +
        'vec2 zeroToOne = a_position / u_resolution;' +
        'vec2 zeroToTwo = zeroToOne * 2.0;' +
        'vec2 clipSpace = zeroToTwo - 1.0;' +
        'gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);' +
        'v_texCoord = a_texCoord;' +
        '}';

}(cornerstone));