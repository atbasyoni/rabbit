import { IsOptional, IsString, IsNumber } from 'class-validator';

export class ProductFilterDTO {
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @IsOptional()
  @IsNumber()
  category?: string;

  @IsOptional()
  @IsNumber()
  pageSize?: number;

  @IsOptional()
  @IsNumber()
  page?: number;
}