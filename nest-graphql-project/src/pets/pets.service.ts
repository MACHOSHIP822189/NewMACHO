import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet)
    private petsRepository: Repository<Pet>){}

    createPet(createPetInput: CreatePetInput): Promise<Pet> {
        const newPet = this.petsRepository.create(createPetInput);

        return this.petsRepository.save(newPet);
    }
    async findAll(): Promise <Pet[]>{
        return this.petsRepository.find();
    }
    findOne(id: number):Promise <Pet>
{
        return this.petsRepository.findOneOrFail({where: {id: id}});
}   
    async updateOne(id: number,createPetInput: CreatePetInput): Promise <Pet>{
        await this.petsRepository.update(id,createPetInput);
 
        const pet = this.petsRepository.findOneOrFail({where: {id: id}});

        return pet;
    }
    async deleteOne(id: number):Promise <Pet[]>{
        await this.petsRepository.delete(id);
        const delpet = this.petsRepository.find();
        return delpet;
      
       
    }
}
