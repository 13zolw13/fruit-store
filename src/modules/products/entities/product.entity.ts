import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  origin?: string;

  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  price?: number;

  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  supplier?: string;

  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  quantity?: number;
}
