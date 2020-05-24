import { Controller, Post, UseInterceptors, UploadedFiles, Body, Param, Get, Res, UseGuards} from '@nestjs/common';
import {  FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as multer from 'multer';
import * as fs from 'fs';
import { ServerMessages } from '../../utils/serverMessages.util';
import { AuthGuard } from '@nestjs/passport';

var usersPath = './storage/users/';

const jpgFileFilter = (req, file, callback) => {
    let ext = path.extname(file.originalname);

    if(ext !== '.jpg'){
        req.fileValidationError = 'Invalid file type';
        return callback(new Error('Invalid file type'), false);
    }
    return callback(null, true);
}

//Reasigna los valores para guardar la imagen (carpeta y si no existe la crea)
var storageUsers = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log({stringActual : dirCompany , stringdirectorio : dir});
        if (!fs.existsSync('./storage/') ){
            fs.mkdirSync('./storage/');
        }
        if (!fs.existsSync(usersPath) ){
            fs.mkdirSync(usersPath);
        }
        cb(null, usersPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname );
        
    }
});

@Controller('uploads')
export class UploadsController {
    constructor(){}
    //////////////////////////////////////USUARIOS/////////////////////////////////////////////////
    //Crea y guarda la imagen del usuario y su directorio
    @Post('user-image/')
    @UseGuards(AuthGuard())
    @UseInterceptors(FilesInterceptor('files[]', 1, {
        fileFilter: jpgFileFilter,
        storage: storageUsers
    }))
    async companyImageFileUpload(@UploadedFiles() images): Promise<any> {
        return new ServerMessages(false,"Imagen del usuario " + images[0].originalname + " subida.",{});
    }

    //URL que proporciona las imagenes de los usuarios 
    @Get('user-image/:idUser')
    @UseGuards(AuthGuard())
    async serveCompanyImage(@Param('idUser') idUser : String, @Res() res): Promise<any> {
        try {
            res.sendFile( idUser+'.jpg' , { root: 'storage/users/'}, 
            (err) => {
                if (err) {
                    return new ServerMessages(true,"Imagen del usuaruo"+idUser+" no encontrada.",err);
                } else {
                    return new ServerMessages(false,"Imagen del usuario " +idUser + " enviada.",{});
                }
            }
            );
        } catch (error) {
            return new ServerMessages(true,"Imagen del usuaruo"+idUser+" no encontrada.",error);
        }
        
    }
    //Elimina la imagen de un usuario
    @Get('user-delete-image/:idUser')
    @UseGuards(AuthGuard())
    async deleteCompanyImage(@Param('idUser') idUser : String): Promise<any> {
        fs.unlink( 'storage/users/'+idUser+'.jpg', (error) => {
            if (error) {
                return new ServerMessages(true,"Imagen del usuario " + idUser + " no existe.",{});
            };
            return new ServerMessages(false,"Imagen del usuario " + idUser + " se elimino.",{});
        });
    }
}
