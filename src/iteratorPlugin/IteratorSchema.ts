import { TSchema, Type } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';

export const IteratorYieldResultSchema = <TYield extends TSchema>(
  value: TYield
) =>
  Type.Object({
    done: Type.Optional(Type.Literal(false)),
    value,
  });

export const IteratorReturnResultSchema = <TReturn extends TSchema>(
  value: TReturn
) =>
  Type.Object({
    done: Type.Literal(true),
    value,
  });

export const IteratorResultSchema = <
  T extends TSchema,
  TReturn extends TSchema
>(
  yieldValue: T,
  returnValue: TReturn
) =>
  Type.Union([
    IteratorYieldResultSchema(yieldValue),
    IteratorReturnResultSchema(returnValue),
  ]);

export const iteratorResultChecker = TypeCompiler.Compile(
  IteratorResultSchema(Type.Unknown(), Type.Unknown())
);

export const IteratorSchema = <T extends TSchema, TReturn extends TSchema>(
  yieldValue: T,
  returnValue: TReturn
) =>
  Type.Object({
    next: Type.Function([], IteratorResultSchema(yieldValue, returnValue)),
    return: Type.Optional(
      Type.Function(
        [Type.Optional(returnValue)],
        IteratorResultSchema(yieldValue, returnValue)
      )
    ),
    throw: Type.Optional(
      Type.Function([Type.Any()], IteratorResultSchema(yieldValue, returnValue))
    ),
  });

export const iteratorChecker = TypeCompiler.Compile(
  IteratorSchema(Type.Unknown(), Type.Unknown())
);
