import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { DeleteResult, UpdateResult } from 'typeorm';

@Resolver(of => Pet)
export class PetsResolver {
    constructor(private petsService: PetsService){}
    @Query(returns => Pet)
    getPet(@Args('id', {type: () => Int })id: number) : Promise <Pet> {
        return this.petsService.findOne(id);
    }

    @Query(returns => [Pet])
    pets(): Promise<Pet[]>{
        return  this.petsService.findAll();
    }
    

    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
        return this.petsService.createPet(createPetInput);
    }
    @Mutation(returns => Pet)
    updatePet(@Args('id', {type: () => Int })id: number ,
    @Args('updatePetInput')
     updatePetInput: CreatePetInput) : Promise<Pet> {
        return this.petsService.updateOne(id,updatePetInput);
    }
    @Query(returns => [Pet])
    deletePet(@Args('id',{type: ( ) => Int})id:number): Promise<Pet[]> {
        return this.petsService.deleteOne(id);

    }
}            
