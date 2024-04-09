export declare function createColorMatrixFilter(key: string, matrix: number[]): {
    new ({ type, ...options }?: Record<string, any>): {
        matrix: number[];
        colorsOnly: boolean;
        setOptions({ matrix, ...options }: Record<string, any>): void;
        getFragmentSource(): string;
        applyTo2d(options: import("./typedefs").T2DPipelineState): void;
        getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLUniformLocationMap;
        sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap): void;
        readonly type: string;
        vertexSource: string;
        mainParameter?: keyof any | undefined;
        createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        };
        getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLAttributeLocationMap;
        sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
        _setupFrameBuffer(options: import("./typedefs").TWebGLPipelineState): void;
        _swapTextures(options: import("./typedefs").TWebGLPipelineState): void;
        isNeutralState(options?: any): boolean;
        applyTo(options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState): void;
        getCacheKey(): string;
        retrieveShader(options: import("./typedefs").TWebGLPipelineState): import("./typedefs").TWebGLProgramCacheItem;
        applyToWebGL(options: import("./typedefs").TWebGLPipelineState): void;
        bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
        unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
        getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined) | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined;
        setMainParameter(value: any): void;
        createHelpLayer(options: import("./typedefs").T2DPipelineState): void;
        toObject(): {
            type: string;
        };
        toJSON(): {
            type: string;
        };
    };
    type: string;
    defaults: {
        /**
         * Lock the matrix export for this kind of static, parameter less filters.
         */
        mainParameter: undefined;
        matrix: number[];
        type?: string | undefined;
        vertexSource?: string | undefined;
        colorsOnly?: boolean | undefined;
    };
    fromObject({ type, ...filterOptions }: Record<string, any>, options: import("../typedefs").Abortable): Promise<import("./BaseFilter").BaseFilter>;
};
export declare const Brownie: {
    new ({ type, ...options }?: Record<string, any>): {
        matrix: number[];
        colorsOnly: boolean;
        setOptions({ matrix, ...options }: Record<string, any>): void;
        getFragmentSource(): string;
        applyTo2d(options: import("./typedefs").T2DPipelineState): void;
        getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLUniformLocationMap;
        sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap): void;
        readonly type: string;
        vertexSource: string;
        mainParameter?: keyof any | undefined;
        createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        };
        getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLAttributeLocationMap;
        sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
        _setupFrameBuffer(options: import("./typedefs").TWebGLPipelineState): void;
        _swapTextures(options: import("./typedefs").TWebGLPipelineState): void;
        isNeutralState(options?: any): boolean;
        applyTo(options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState): void;
        getCacheKey(): string;
        retrieveShader(options: import("./typedefs").TWebGLPipelineState): import("./typedefs").TWebGLProgramCacheItem;
        applyToWebGL(options: import("./typedefs").TWebGLPipelineState): void;
        bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
        unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
        getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined) | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined;
        setMainParameter(value: any): void;
        createHelpLayer(options: import("./typedefs").T2DPipelineState): void;
        toObject(): {
            type: string;
        };
        toJSON(): {
            type: string;
        };
    };
    type: string;
    defaults: {
        /**
         * Lock the matrix export for this kind of static, parameter less filters.
         */
        mainParameter: undefined;
        matrix: number[];
        type?: string | undefined;
        vertexSource?: string | undefined;
        colorsOnly?: boolean | undefined;
    };
    fromObject({ type, ...filterOptions }: Record<string, any>, options: import("../typedefs").Abortable): Promise<import("./BaseFilter").BaseFilter>;
};
export declare const Vintage: {
    new ({ type, ...options }?: Record<string, any>): {
        matrix: number[];
        colorsOnly: boolean;
        setOptions({ matrix, ...options }: Record<string, any>): void;
        getFragmentSource(): string;
        applyTo2d(options: import("./typedefs").T2DPipelineState): void;
        getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLUniformLocationMap;
        sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap): void;
        readonly type: string;
        vertexSource: string;
        mainParameter?: keyof any | undefined;
        createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        };
        getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLAttributeLocationMap;
        sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
        _setupFrameBuffer(options: import("./typedefs").TWebGLPipelineState): void;
        _swapTextures(options: import("./typedefs").TWebGLPipelineState): void;
        isNeutralState(options?: any): boolean;
        applyTo(options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState): void;
        getCacheKey(): string;
        retrieveShader(options: import("./typedefs").TWebGLPipelineState): import("./typedefs").TWebGLProgramCacheItem;
        applyToWebGL(options: import("./typedefs").TWebGLPipelineState): void;
        bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
        unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
        getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined) | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined;
        setMainParameter(value: any): void;
        createHelpLayer(options: import("./typedefs").T2DPipelineState): void;
        toObject(): {
            type: string;
        };
        toJSON(): {
            type: string;
        };
    };
    type: string;
    defaults: {
        /**
         * Lock the matrix export for this kind of static, parameter less filters.
         */
        mainParameter: undefined;
        matrix: number[];
        type?: string | undefined;
        vertexSource?: string | undefined;
        colorsOnly?: boolean | undefined;
    };
    fromObject({ type, ...filterOptions }: Record<string, any>, options: import("../typedefs").Abortable): Promise<import("./BaseFilter").BaseFilter>;
};
export declare const Kodachrome: {
    new ({ type, ...options }?: Record<string, any>): {
        matrix: number[];
        colorsOnly: boolean;
        setOptions({ matrix, ...options }: Record<string, any>): void;
        getFragmentSource(): string;
        applyTo2d(options: import("./typedefs").T2DPipelineState): void;
        getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLUniformLocationMap;
        sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap): void;
        readonly type: string;
        vertexSource: string;
        mainParameter?: keyof any | undefined;
        createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        };
        getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLAttributeLocationMap;
        sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
        _setupFrameBuffer(options: import("./typedefs").TWebGLPipelineState): void;
        _swapTextures(options: import("./typedefs").TWebGLPipelineState): void;
        isNeutralState(options?: any): boolean;
        applyTo(options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState): void;
        getCacheKey(): string;
        retrieveShader(options: import("./typedefs").TWebGLPipelineState): import("./typedefs").TWebGLProgramCacheItem;
        applyToWebGL(options: import("./typedefs").TWebGLPipelineState): void;
        bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
        unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
        getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined) | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined;
        setMainParameter(value: any): void;
        createHelpLayer(options: import("./typedefs").T2DPipelineState): void;
        toObject(): {
            type: string;
        };
        toJSON(): {
            type: string;
        };
    };
    type: string;
    defaults: {
        /**
         * Lock the matrix export for this kind of static, parameter less filters.
         */
        mainParameter: undefined;
        matrix: number[];
        type?: string | undefined;
        vertexSource?: string | undefined;
        colorsOnly?: boolean | undefined;
    };
    fromObject({ type, ...filterOptions }: Record<string, any>, options: import("../typedefs").Abortable): Promise<import("./BaseFilter").BaseFilter>;
};
export declare const Technicolor: {
    new ({ type, ...options }?: Record<string, any>): {
        matrix: number[];
        colorsOnly: boolean;
        setOptions({ matrix, ...options }: Record<string, any>): void;
        getFragmentSource(): string;
        applyTo2d(options: import("./typedefs").T2DPipelineState): void;
        getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLUniformLocationMap;
        sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap): void;
        readonly type: string;
        vertexSource: string;
        mainParameter?: keyof any | undefined;
        createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        };
        getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLAttributeLocationMap;
        sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
        _setupFrameBuffer(options: import("./typedefs").TWebGLPipelineState): void;
        _swapTextures(options: import("./typedefs").TWebGLPipelineState): void;
        isNeutralState(options?: any): boolean;
        applyTo(options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState): void;
        getCacheKey(): string;
        retrieveShader(options: import("./typedefs").TWebGLPipelineState): import("./typedefs").TWebGLProgramCacheItem;
        applyToWebGL(options: import("./typedefs").TWebGLPipelineState): void;
        bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
        unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
        getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined) | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined;
        setMainParameter(value: any): void;
        createHelpLayer(options: import("./typedefs").T2DPipelineState): void;
        toObject(): {
            type: string;
        };
        toJSON(): {
            type: string;
        };
    };
    type: string;
    defaults: {
        /**
         * Lock the matrix export for this kind of static, parameter less filters.
         */
        mainParameter: undefined;
        matrix: number[];
        type?: string | undefined;
        vertexSource?: string | undefined;
        colorsOnly?: boolean | undefined;
    };
    fromObject({ type, ...filterOptions }: Record<string, any>, options: import("../typedefs").Abortable): Promise<import("./BaseFilter").BaseFilter>;
};
export declare const Polaroid: {
    new ({ type, ...options }?: Record<string, any>): {
        matrix: number[];
        colorsOnly: boolean;
        setOptions({ matrix, ...options }: Record<string, any>): void;
        getFragmentSource(): string;
        applyTo2d(options: import("./typedefs").T2DPipelineState): void;
        getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLUniformLocationMap;
        sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap): void;
        readonly type: string;
        vertexSource: string;
        mainParameter?: keyof any | undefined;
        createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        };
        getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLAttributeLocationMap;
        sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
        _setupFrameBuffer(options: import("./typedefs").TWebGLPipelineState): void;
        _swapTextures(options: import("./typedefs").TWebGLPipelineState): void;
        isNeutralState(options?: any): boolean;
        applyTo(options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState): void;
        getCacheKey(): string;
        retrieveShader(options: import("./typedefs").TWebGLPipelineState): import("./typedefs").TWebGLProgramCacheItem;
        applyToWebGL(options: import("./typedefs").TWebGLPipelineState): void;
        bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
        unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
        getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined) | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined;
        setMainParameter(value: any): void;
        createHelpLayer(options: import("./typedefs").T2DPipelineState): void;
        toObject(): {
            type: string;
        };
        toJSON(): {
            type: string;
        };
    };
    type: string;
    defaults: {
        /**
         * Lock the matrix export for this kind of static, parameter less filters.
         */
        mainParameter: undefined;
        matrix: number[];
        type?: string | undefined;
        vertexSource?: string | undefined;
        colorsOnly?: boolean | undefined;
    };
    fromObject({ type, ...filterOptions }: Record<string, any>, options: import("../typedefs").Abortable): Promise<import("./BaseFilter").BaseFilter>;
};
export declare const Sepia: {
    new ({ type, ...options }?: Record<string, any>): {
        matrix: number[];
        colorsOnly: boolean;
        setOptions({ matrix, ...options }: Record<string, any>): void;
        getFragmentSource(): string;
        applyTo2d(options: import("./typedefs").T2DPipelineState): void;
        getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLUniformLocationMap;
        sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap): void;
        readonly type: string;
        vertexSource: string;
        mainParameter?: keyof any | undefined;
        createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        };
        getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLAttributeLocationMap;
        sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
        _setupFrameBuffer(options: import("./typedefs").TWebGLPipelineState): void;
        _swapTextures(options: import("./typedefs").TWebGLPipelineState): void;
        isNeutralState(options?: any): boolean;
        applyTo(options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState): void;
        getCacheKey(): string;
        retrieveShader(options: import("./typedefs").TWebGLPipelineState): import("./typedefs").TWebGLProgramCacheItem;
        applyToWebGL(options: import("./typedefs").TWebGLPipelineState): void;
        bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
        unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
        getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined) | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined;
        setMainParameter(value: any): void;
        createHelpLayer(options: import("./typedefs").T2DPipelineState): void;
        toObject(): {
            type: string;
        };
        toJSON(): {
            type: string;
        };
    };
    type: string;
    defaults: {
        /**
         * Lock the matrix export for this kind of static, parameter less filters.
         */
        mainParameter: undefined;
        matrix: number[];
        type?: string | undefined;
        vertexSource?: string | undefined;
        colorsOnly?: boolean | undefined;
    };
    fromObject({ type, ...filterOptions }: Record<string, any>, options: import("../typedefs").Abortable): Promise<import("./BaseFilter").BaseFilter>;
};
export declare const BlackWhite: {
    new ({ type, ...options }?: Record<string, any>): {
        matrix: number[];
        colorsOnly: boolean;
        setOptions({ matrix, ...options }: Record<string, any>): void;
        getFragmentSource(): string;
        applyTo2d(options: import("./typedefs").T2DPipelineState): void;
        getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLUniformLocationMap;
        sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap): void;
        readonly type: string;
        vertexSource: string;
        mainParameter?: keyof any | undefined;
        createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        };
        getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./typedefs").TWebGLAttributeLocationMap;
        sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
        _setupFrameBuffer(options: import("./typedefs").TWebGLPipelineState): void;
        _swapTextures(options: import("./typedefs").TWebGLPipelineState): void;
        isNeutralState(options?: any): boolean;
        applyTo(options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState): void;
        getCacheKey(): string;
        retrieveShader(options: import("./typedefs").TWebGLPipelineState): import("./typedefs").TWebGLProgramCacheItem;
        applyToWebGL(options: import("./typedefs").TWebGLPipelineState): void;
        bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
        unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
        getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLAttributeLocationMap) | ((options: import("./typedefs").TWebGLPipelineState) => import("./typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./typedefs").TWebGLUniformLocationMap) | (() => string) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./typedefs").TWebGLUniformLocationMap) => void) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
            program: WebGLProgram;
            attributeLocations: import("./typedefs").TWebGLAttributeLocationMap;
            uniformLocations: import("./typedefs").TWebGLUniformLocationMap;
        }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((options: import("./typedefs").TWebGLPipelineState | import("./typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined) | (() => {
            type: string;
        }) | (() => {
            type: string;
        }) | ((value: any) => void) | ((options: import("./typedefs").T2DPipelineState) => void) | undefined;
        setMainParameter(value: any): void;
        createHelpLayer(options: import("./typedefs").T2DPipelineState): void;
        toObject(): {
            type: string;
        };
        toJSON(): {
            type: string;
        };
    };
    type: string;
    defaults: {
        /**
         * Lock the matrix export for this kind of static, parameter less filters.
         */
        mainParameter: undefined;
        matrix: number[];
        type?: string | undefined;
        vertexSource?: string | undefined;
        colorsOnly?: boolean | undefined;
    };
    fromObject({ type, ...filterOptions }: Record<string, any>, options: import("../typedefs").Abortable): Promise<import("./BaseFilter").BaseFilter>;
};
//# sourceMappingURL=ColorMatrixFilters.d.ts.map