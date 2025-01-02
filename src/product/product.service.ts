import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { ProductDTO } from './dto/product.dto';
import { ProductFilterDTO } from './dto/product-filter.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productsRepository: ProductRepository,
    private prismaService: PrismaService,
  ) {}

  async getAllProducts(filter: ProductFilterDTO): Promise<ProductDTO[]> {
    const { searchTerm, category, page, pageSize } = filter;

    const products = await this.prismaService.product.findMany({
      where: {
        name: { contains: searchTerm },
        category: category ? category : undefined,
      },
      orderBy: { createdAt: 'desc' },
      skip: page * pageSize,
      take: pageSize,
      select: { id: true, name: true, category: true, area: true, createdAt: true },
    });

    return products;
  }

  async getProductById(id: number): Promise<ProductDTO> {
    return this.productsRepository.findById(id);
  }

  async getTopProducts(area: string) {
    const topProducts = await this.prismaService.orderItem.groupBy({
      by: ['productId'],
      where: {
        product: {
          area: area,
        },
      },
      _count: {
        productId: true,
      },
      orderBy: {
        _count: {
          productId: 'desc',
        },
      },
      take: 10,
    });
  
    const productIds = topProducts.map((item) => item.productId);
    const products = await this.prismaService.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });
  
    const result = topProducts.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...product,
        orderCount: item._count.productId,
      };
    });
  
    return result;
  }
}
