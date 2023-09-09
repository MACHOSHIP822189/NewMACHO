import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type:  'postgres',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'graphQl',
      autoLoadEntities: true,  
      synchronize: true,
   
     logging: true,
   })
   ,
    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
