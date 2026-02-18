import {  IsString, IsEmail,IsNotEmpty } from 'class-validator';


export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty({message:'this field cannot be emty'})
    email:string

    @IsString({message:'enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    username:string


}