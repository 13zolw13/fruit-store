import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async create(createProductInput: CreateProductInput) {
    const createProduct = new this.productModel(createProductInput);

    return await createProduct.save();
  }

  async findAll() {
    return await this.productModel.find({});
  }

  async findOne(id: string) {
    return await this.productModel.findById(id);
  }

  async update(updateProductInput: UpdateProductInput) {
    return await this.productModel.findByIdAndUpdate(
      updateProductInput.id,
      {
        ...updateProductInput,
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndRemove(id);
  }
}
