# json-shake

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
- variables: IterableObject<ShakeVariableDefinition>;
- onStart: ShakeExecutionDefinition | null;
- onDestroy: ShakeExecutionDefinition | null;
- triggers: ShakeTriggerDefinition[];
- closures: ShakeClosureDefinition[];
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