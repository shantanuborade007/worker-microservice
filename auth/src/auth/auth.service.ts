/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import axios, { AxiosRequestConfig } from 'axios';
import * as fs from 'fs';
import {HttpService } from "@nestjs/axios";



@Injectable()
export class AuthService {

  private readonly apiUrl: string;
  private logger:Logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly httpService : HttpService

  ) {
    this.apiUrl = process.env.WORKER_URL || 'http://localhost:3001'; 
  }

  

  async signup(signupDto: SignupDto): Promise<User> {
      try{
            const { name, email, password, role, tenetId, clientId, audience, appId } =
                signupDto;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await this.userRepository.create({
              name,
              email,
              password: hashedPassword,
              role,
              tenetId,
              clientId,
              audience,
              appId,
              jobs: [],
            });
           const savedUser = await this.userRepository.save(newUser);
          this.logger.log('user creation successfully.');

        return savedUser;
    }catch(error){
      this.logger.error(error);
    }

  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    // const user = await this.userRepository.findOne({ where: { loginDet } });
    const email = loginDto.email;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      tenetId: user.tenetId,
      clientId: user.clientId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
async createJob(result:{content:string,md5:string}, status: string, user: any) {
  try {

      const content = result.content
      const md5 = result.md5
      const createJobDto = {content,md5,status,user}
        const config: AxiosRequestConfig = {
        url: `${this.apiUrl}/job`,
        method: 'POST',
        data: createJobDto,
      };

        const response = await this.httpService.axiosRef.request(config)
        const id = response.data.id;
        user.jobs.push(id);
        await this.userRepository.save(user);
        this.logger.log('Job created successfully.');
        return response.data;
  } catch (error) {
    this.logger.error('Error creating job:',error.response ? error.response.data : error.message)
    throw new Error('Failed to create job');
  }
}


async processImage(file: Express.Multer.File): Promise<{ content: string; md5: string }> {
  if (!file) {
    this.logger.error('File not found');
    throw new NotFoundException('No image file uploaded');
  }

  const buffer = await fs.promises.readFile(file.path);

  const content = buffer.toString('base64');
  const md5 = crypto.createHash('md5').update(buffer).digest('hex');

  await fs.promises.unlink(file.path); // Clean up temporary file

  return { content, md5 };
}

async getJobById(id:string){
 try{
   const config : AxiosRequestConfig = {
     url:`${this.apiUrl}/job/${id}`,
     method:"GET"
   }
   const response = await this.httpService.axiosRef.request(config)
   this.logger.log('job response successfully.');
   return response.data
 }catch (error){
   this.logger.error('Error getting job with id '+id);
 }
}

async getJobStatus(id:string){
  try{
    const config : AxiosRequestConfig = {
      url:`${this.apiUrl}/job/status/${id}`,
      method:"GET"
    }
    const response = await this.httpService.axiosRef.request(config)
    this.logger.log('job status fetched successfully.');
    return response.data
  }catch(error){
    this.logger.error('Error getting job status');
  }
}

async getAllJobs(){
  try{
    const config : AxiosRequestConfig = {
      url:`${this.apiUrl}/job`,
      method:"GET"
    }
    const response = await this.httpService.axiosRef.request(config)
    this.logger.log('job response successful');
    return response.data

  }catch (error){
    this.logger.error('Error getting all jobs');
  }
}




}
