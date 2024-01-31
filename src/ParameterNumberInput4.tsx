import * as React from 'react';
import { parameterWrapped, InjectedProps } from './ElementWrapper';
import { RcpTypes, Vector4, Vector4F32Definition } from 'rabbitcontrol';
import { NumberInput } from 'carbon-components-react';

interface Props {
};

interface State {
};

export class ParameterNumericInput4C extends React.Component<Props & InjectedProps, State> {

    constructor(props: Props & InjectedProps) {
        super(props);
    
        this.state = {        
        };
    }    

    handleChangeX = (e: any, direction: any, value: any) => {

        const vec = (this.props.value as Vector4).clone();
        vec.x = value;

        if (this.props.handleValue) {
            this.props.handleValue(vec);
        }

        if (this.props.onSubmitCb) {
            this.props.onSubmitCb();
        }
    }
    handleChangeY = (e: any, direction: any, value: any) => {

        const vec = (this.props.value as Vector4).clone();
        vec.y = value;

        if (this.props.handleValue) {
            this.props.handleValue(vec);
        }

        if (this.props.onSubmitCb) {
            this.props.onSubmitCb();
        }
    }
    handleChangeZ = (e: any, direction: any, value: any) => {

        const vec = (this.props.value as Vector4).clone();
        vec.z = value;

        if (this.props.handleValue) {
            this.props.handleValue(vec);
        }

        if (this.props.onSubmitCb) {
            this.props.onSubmitCb();
        }
    }
    handleChangeT = (e: any, direction: any, value: any) => {

        const vec = (this.props.value as Vector4).clone();
        vec.t = value;

        if (this.props.handleValue) {
            this.props.handleValue(vec);
        }

        if (this.props.onSubmitCb) {
            this.props.onSubmitCb();
        }
    }

    render() {
        const value = this.props.value as Vector4;
        let step = new Vector4(1, 1, 1, 1);
        let isFloat:boolean = false;
        let min:Vector4|undefined = undefined;
        let max:Vector4|undefined = undefined; 
        let readOnly:boolean = false;

        const param = this.props.parameter;
        if (param) {

            readOnly = param.readonly || false;

            isFloat = param.typeDefinition.datatype === RcpTypes.Datatype.VECTOR2F32 ||
                        param.typeDefinition.datatype === RcpTypes.Datatype.VECTOR3F32 ||
                        param.typeDefinition.datatype === RcpTypes.Datatype.VECTOR4F32;

            const numdef = param.typeDefinition as Vector4F32Definition;

            if (numdef !== undefined) {

                if (numdef.minimum !== undefined && 
                    numdef.maximum !== undefined)
                {

                    if (numdef.minimum.x < numdef.maximum.x &&
                        numdef.minimum.y < numdef.maximum.y &&
                        numdef.minimum.z < numdef.maximum.z &&
                        numdef.minimum.t < numdef.maximum.t)
                    {
                        min = numdef.minimum;
                        max = numdef.maximum;
                    } else {
                        // error on min/max
                        //console.error("NumberInput: minimum >= maximum");                
                    }
                }

                if (numdef.multipleof) {
                    step = numdef.multipleof;
                } else if (isFloat) {
                    step.x = 0.1;
                    step.y = 0.1;
                    step.z = 0.1;
                    step.t = 0.1;
                }
            }
        }

        const { onSubmitCb, handleValue, tabId, selectedTab, ...filteredProps } = this.props;

        return (
            <div>
                <label className="bx--label">{param?.label || ""}</label>
                <NumberInput
                    id={param?.id.toString()+"_1" || "number_1"}
                    {...filteredProps}
                    value={value ? value.x : 0}
                    min={min ? min.x : undefined}
                    max={max ? max.x : undefined}
                    step={step.x}
                    onChange={this.handleChangeX}
                    disabled={readOnly === true}
                    placeholder={"-"}
                />
                <NumberInput
                    id={param?.id.toString()+"_2" || "number_2"}
                    {...filteredProps}
                    value={value ? value.y : 0}
                    min={min ? min.y : undefined}
                    max={max ? max.y : undefined}
                    step={step.y}
                    onChange={this.handleChangeY}
                    disabled={readOnly === true}
                    placeholder={"-"}
                />
                <NumberInput
                    id={param?.id.toString()+"_3" || "number_3"}
                    {...filteredProps}
                    value={value ? value.z : 0}
                    min={min ? min.z : undefined}
                    max={max ? max.z : undefined}
                    step={step.z}
                    onChange={this.handleChangeZ}
                    disabled={readOnly === true}
                    placeholder={"-"}
                />
                <NumberInput
                    id={param?.id.toString()+"_4" || "number_4"}
                    {...filteredProps}
                    value={value ? value.t : 0}
                    min={min ? min.t : undefined}
                    max={max ? max.t : undefined}
                    step={step.t}
                    onChange={this.handleChangeT}
                    disabled={readOnly === true}
                    placeholder={"-"}
                />                
            </div>
        );
    }
};

export const ParameterNumericInput4 = parameterWrapped()(ParameterNumericInput4C);