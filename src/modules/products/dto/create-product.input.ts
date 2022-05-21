import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
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
