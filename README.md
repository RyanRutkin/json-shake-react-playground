# json-shake

## TODO
- JSON Logic does not ship with standard arithmetic operations. Custom operators can be added, but this is only supported in Javascript. Also, JSON Logic performs global assignment. Add arithmetic operations to Autological and swicth back to Autological instead of JSON Logic.
- Having a variable setter use an evaluation _every time_ is too verbose for direct setting. Allow a value prop to be included.

## ShakeBase<T>
### serial-zeAsJson(): T;

### ShakeBaseStatic<T, P extends ShakeBase<T>>
#### new(label?: string): P;
#### deserializeFromJson(def: T): P

## ShakeClosure
### Definition
#### Type
Object
### Properties
- label: string;
- variables: Record<string, [ShakeVariableDefinition](https://github.com/RyanRutkin/json-shake-react-playground#shakevariable)>;
- onStart: [ShakeExecutionDefinition](https://github.com/RyanRutkin/json-shake-react-playground#shakeexecution) | null;
- onDestroy: [ShakeExecutionDefinition](https://github.com/RyanRutkin/json-shake-react-playground#shakeexecution) | null;
- triggers: [ShakeTriggerDefinition](https://github.com/RyanRutkin/json-shake-react-playground#shaketrigger)[];
- closures: [ShakeClosureDefinition](https://github.com/RyanRutkin/json-shake-react-playground#shakeclosure)[];
- id: string | null;

## ShakeCondition
### Definition
#### Type
Object
### Properties
- type: 'condition';
- label: string;
- onTrue: ShakeClosureDefinition | null;
- onFalse: ShakeClosureDefinition | null;
- id: string | null;

## ShakeEvaluation
### Definition
#### Type
Object
### Properties
- label: string;
- logic: RulesLogic;
- id: string | null;

## ShakeExecution
### Definition
#### Type
Object
### Properties
- label: string;
- sequence: (ShakeConditionDefinition | ShakeVariableSetterDefinition | ShakeWhileDefinition | ShakeInvokerDefinition)[];
- id: string | null;

## ShakeExecutionSequence
### Definition
#### Type
ShakeExecutionSequenceMemberDefinition[]

## ShakeExecutionSequenceMember
### Definition
#### Type
Union
#### Options
- ShakeConditionDefinition
- ShakeVariableSetterDefinition
- ShakeWhileDefinition
- ShakeInvokerDefinition;

## ShakeExecutionSequenceMemberType
### Definition
#### Type
Union
#### Options
- 'condition'
- 'setter'
- 'while'
- 'invoker'

## ShakeExecutionSequenceMemberBase
### Definition
#### Type
Object
### Properties
- type: ShakeExecutionSequenceMemberType;
- evaluation: ShakeEvaluationDefinition | null;

## ShakeInvoker
### Definition
#### Type
Object
#### Properties
- label: string;
- type: 'invoker';
- id: string | null;
- closureName: string;
- parametersClosureNames: string[];

## ShakeNodeType
### Derfinition
#### Type
Union
#### Options
- 'closure'
- 'condition'
- 'evaluation'
- 'execution'
- 'invoker'
- 'trigger'
- 'variable'
- 'setter'
- 'while'

## ShakeTriggerWatchedVariable
### Definition
#### Type
Object
#### Properties
- label: string;
- on: 'before' | 'after'

## ShakeTrigger
### Definition
#### Type
Object
#### Properties
- label: string;
- watchedVariables: ShakeTriggerWatchedVariableDefinition[];
- onTrigger: ShakeExecutionDefinition | null;
- id: string | null;

## ShakeVariable
### Definition
#### Type
Object
#### Properties
- label: string;
- value: string;
- type: keyof ShakeVariableType;
- id: string | null;

## ShakeVariableSetter
### Definition
#### Extends
ShakeExecutionSequenceMemberBase
#### Type
Object
#### Properties
- type: 'setter';
- label: string;
- variableLabel: string | null;
- id: string | null;

## ShakeVariableType
### Definition
#### Type
TypeScript Magic Lookup Table...
This is essentially a union that respresents the data types supported by variables. This allows us to name the variable via a string, and allow typescript to treat the value as the interpreted type. This will allow better type reporting on actions involving user defined variables.
#### Options
- 'boolean' (translates to boolean)
- 'number' (translates to number)
- 'object' (translates to Record<string, any>)
- 'string' (translates to string)
- 'any' (translates to any)

## ShakeWhile
### Definition
#### Extends
ShakeExecutionSequenceMemberBase
#### Type
Object
#### Properties
- type: 'while',
- label: string;
- execution: ShakeExecutionDefinition | null;
- id: string | null;