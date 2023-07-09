// * LINEAR

float linear(float t) {
    return t;
}


// * QUAD

float easeInQuad(float t) {
    return t * t;
}

float easeOutQuad(float t) {
    return t * (2.0 - t);
}

float easeInOutQuad(float t) {
    return t < 0.5 ? 2.0 * t * t : -1.0 + (4.0 - 2.0 * t) * t;
}



// * CUBIC

float easeInCubic(float t) {
    return t * t * t;
}

float easeOutCubic(float t) {
    return (--t) * t * t + 1.0;
}

float easeInOutCubic(float t) {
    return t < 0.5 ? 4.0 * t * t * t : (t-1.0)*(2.0*t-2.0)*(2.0*t-2.0) + 1.0;
}


// * QUART

float easeInQuart(float t) {
    return t * t * t * t;
}

float easeOutQuart(float t) {
    return 1.0 - (--t) * t * t * t;
}

float easeInOutQuart(float t) {
    return t < 0.5 ? 8.0 * t * t * t * t : 1.0 - 8.0 * (--t) * t * t * t;
}


// * QUINT

float easeInQuint(float t) {
    return t * t * t * t * t;
}

float easeOutQuint(float t) {
    return 1.0 + (--t) * t * t * t * t;
}

float easeInOutQuint(float t) {
    return t < 0.5 ? 16.0 * t * t * t * t * t : 1.0 + 16.0 * (--t) * t * t * t * t;
}



// * SINE

float easeInSine(float t) {
    return -1.0 * cos(t * (PI/2.0)) + 1.0;
}

float easeOutSine(float t) {
    return sin(t * (PI/2.0));
}

float easeInOutSine(float t) {
    return -0.5 * (cos(PI * t) - 1.0);
}


// * EXPO

float easeInExpo(float t) {
    return (t == 0.0) ? 0.0 : pow(2.0, 10.0 * (t - 1.0));
}

float easeOutExpo(float t) {
    return (t == 1.0) ? 1.0 : -pow(2.0, -10.0 * t) + 1.0;
}

float easeInOutExpo(float t) {
    if(t == 0.0) return 0.0;
    if(t == 1.0) return 1.0;
    if((t /= 0.5) < 1.0) return 0.5 * pow(2.0, 10.0 * (t - 1.0));
    return 0.5 * (-pow(2.0, -10.0 * --t) + 2.0);
}


// * CIRC

float easeInCirc(float t) {
    return -1.0 * (sqrt(1.0 - t * t) - 1.0);
}

float easeOutCirc(float t) {
    return sqrt(1.0 - (--t) * t);
}

float easeInOutCirc(float t) {
    if((t /= 0.5) < 1.0) return -0.5 * (sqrt(1.0 - t * t) - 1.0);
    return 0.5 * (sqrt(1.0 - (t -= 2.0) * t) + 1.0);
}


// * ELASTIC

float easeInElastic(float t) {
    float p = 0.3;
    float a = 1.0;
    float s = p/4.0;
    float postFix = a*pow(2.0,10.0*(t-=1.0));
    return -(postFix * sin((t-s)*(2.0*PI)/p ));
}

float easeOutElastic(float t) {
    float p = 0.3;
    float a = 1.0;
    float s = p/4.0;
    return (a*pow(2.0,-10.0*t) * sin((t-s)*(2.0*PI)/p) + 1.0);
}

float easeInOutElastic(float t) {
    float p = 0.3*1.5;
    float a = 1.0;
    float s = p/4.0;

    if(t < 0.5) {
        float postFix = a*pow(2.0,10.0*(t-=1.0));
        return -.5*(postFix* sin((t-s)*(2.0*PI)/p));
    } 
    float postFix = a*pow(2.0,-10.0*(t-=1.0));
    return postFix * sin((t-s)*(2.0*PI)/p)*.5 + 1.0;
}


// * BACK

float easeInBack(float t) {
    const float s = 1.70158;
    return t * t * ((s + 1.0) * t - s);
}

float easeOutBack(float t) {
    const float s = 1.70158;
    return ((--t) * t * ((s + 1.0) * t + s) + 1.0);
}

float easeInOutBack(float t) {
    float s = 1.70158; 
    if((t /= 0.5) < 1.0) return 0.5*(t*t*(((s*=(1.525))+1.0)*t - s));
    return 0.5*((t-=2.0)*t*(((s*=(1.525))+1.0)*t + s) + 2.0);
}


// * BOUNCE

float bounce(float t) {
    if (t < (1.0/2.75)) {
        return 7.5625 * t * t;
    } else if (t < (2.0/2.75)) {
        return 7.5625 * (t -= (1.5/2.75)) * t + 0.75;
    } else if (t < (2.5/2.75)) {
        return 7.5625 * (t -= (2.25/2.75)) * t + 0.9375;
    } else {
        return 7.5625 * (t -= (2.625/2.75)) * t + 0.984375;
    }
}

float easeInBounce(float t) {
    return 1.0 - bounce(1.0 - t);
}

float easeOutBounce(float t) {
    return bounce(t);
}

float easeInOutBounce(float t) {
    if(t < 0.5) {
        return 0.5 * (1.0 - bounce(1.0 - 2.0 * t));
    } else {
        return 0.5 * bounce(2.0 * t - 1.0) + 0.5;
    }
}
