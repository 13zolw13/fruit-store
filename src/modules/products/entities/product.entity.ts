import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@ObjectType()
@Schema()
export class Product {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @Prop()
  name: string;

  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  @Prop({ required: false })
  origin?: string;

  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  @Prop({ required: false })
  price?: number;

  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  @Prop({ required: false })
  supplier?: string;

  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  @Prop({ required: false })
  quantity?: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
