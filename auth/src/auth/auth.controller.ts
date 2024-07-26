import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  Param,
  Get
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guard/jwt-auth-guard';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

const multerOptions: MulterOptions = {
  dest: 'tmp/', // Set the destination for temporary uploaded files
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
};

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({ status: 201, description: 'User successfully signed up.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: SignupDto })
  async signup(@Body() signupDto: SignupDto) {
    const user = await this.authService.signup(signupDto);
    return user;
  }

  @Post('auth/login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    console.log('here 1');
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException();
    }

    const token = await this.authService.login(user);
    res.cookie('jwt', token.access_token, { httpOnly: true });
    res.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('api/v1/job')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @ApiOperation({ summary: 'Create job with image' })
  @ApiResponse({ status: 201, description: 'Job successfully created.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBearerAuth()
  async createJobWithImage(@UploadedFile() image: Express.Multer.File, @Body('status') status: string, @Req() req: any) {
    const user = req.user;
    const result = await this.authService.processImage(image);
    console.log(status);
    const job = await this.authService.createJob(result, status, user);
    return job;
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/v1/job/:id')
  @ApiOperation({ summary: 'Get job by ID' })
  @ApiResponse({ status: 200, description: 'Job details.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiParam({ name: 'id', required: true, description: 'Job ID' })
  @ApiBearerAuth()
  async getJobById(@Param('id') id: string) {
    const job = await this.authService.getJobById(id);
    return job;
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/v1/job/status/:id')
  @ApiOperation({ summary: 'Get job status by ID' })
  @ApiResponse({ status: 200, description: 'Job status.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiParam({ name: 'id', required: true, description: 'Job ID' })
  @ApiBearerAuth()
  async getJobStatus(@Param('id') id: string) {
    const job = await this.authService.getJobStatus(id);
    return job;
  }

  @Get('job')
  async getAllJobs(){
    return this.authService.getAllJobs();
  }
}
