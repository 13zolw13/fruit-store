import { Test, TestingModule } from '@nestjs/testing';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

const mockProduct = {
  id: '1',
  name: 'Product 1',
  price: 1,
  quantity: 1,
};

const mockProduct2 = {
  id: '1234',
  name: 'Product 1123',
  price: 2,
  quantity: 3,
};

const updatedMockProduct = {
  id: '1',
  name: 'product2',
  price: 1,
  quantity: 1,
};
describe('ProductsResolver', () => {
  let resolver: ProductsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsResolver,
        {
          provide: ProductsService,
          useFactory: () => ({
            create: jest.fn((product: Product) => ({
              id: '1',
              ...product,
            })),
            findAll: jest.fn(() => [mockProduct, mockProduct2]),
            findOne: jest.fn((id: string) => ({
              id: id,
              name: 'Product 1',
              price: 1,
              quantity: 1,
            })),
            update: jest.fn((product: Product) => ({
              id: product.id,
              ...product,
            })),
            remove: jest.fn((id: string) => ({
              id: id,
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a product', () => {
      const product = {
        name: 'Product 1',
        price: 1,
        quantity: 1,
      };

      expect(resolver.createProduct(product)).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = await resolver.findAll();
      expect(products).toEqual([mockProduct, mockProduct2]);
    });
  });

  describe('findOne', () => {
    it('should return one product', async () => {
      const product = await resolver.findOne('1');
      expect(product).toEqual(mockProduct);
    });
  });

  describe('updateProduct', () => {
    it('should update product', async () => {
      const product = await resolver.updateProduct({
        id: '1',
        name: 'product2',
        price: 1,
        quantity: 1,
      });
      expect(product).toEqual(updatedMockProduct);
    });
  });
  describe('removeProduct', () => {
    it('should delete product', async () => {
      const product = await resolver.removeProduct('1');
      expect(product.id).toEqual(mockProduct.id);
    });
  });
});
