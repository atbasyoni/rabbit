import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductFilterDTO } from './dto/product-filter.dto';
import { ApiProperty } from '@nestjs/swagger';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  async getAllProducts(@Body() filters: ProductFilterDTO) {
    return this.productsService.getAllProducts(filters);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }

  @Post('top-products')
  @ApiProperty()
  async getTopProducts(@Query('area') area: string) {
    return this.productsService.getTopProducts(area);
  }
}
