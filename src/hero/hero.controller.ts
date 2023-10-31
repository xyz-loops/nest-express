import { Controller, Get, HttpCode, Post, Req, Res, Header, Redirect, Param, NotFoundException, Body} from '@nestjs/common';
import { CreateCatDto } from './dto/create-hero.dto';

let heroes = [
  {
      id: 1,
      nama: 'Aurora',
      type: 'Mage',
      gambar: 'aurora.jpg',
    },
    {
      id: 2,
      nama: 'Zilong',
      type: 'Fighter',
      gambar: 'zilong.jpg',
    },
    {
      id: 3,
      nama: 'Akai',
      type: 'Tank',
      gambar: 'akai.jpg',
    },
]

@Controller("hero")
export class HeroController {
  @Get('index')
  @Header('Content-Type', 'application/json')
  //@HttpCode(204) //Request dengan StatusCode berbeda
  //Use library for response object
  index(@Res() response) {
    // return 'hero index';
    // return {
    //   title: "hero index"
    // };
    response.json(heroes
      // [
      // title: 'hero index',
      // ]
    );
    // response.redirect('https://siakad.pradita.ac.id')
  }

  //Route parameter dynamic
  //Solved latihan dengan chatgpt
  @Get('detail/:id')
  show(@Param('id') id: string) {
    const heroId = parseInt(id, 10);
    const hero = heroes.find((h) => h.id === heroId);

    if (!hero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }

    return hero;
  }

  //Use Standard for response object
  //Example combine standard and library
  @Get('create')
  create(@Res({ passthrough: true}) response): string {
    response.cookie('name', 'marcel');
    return 'hero create';
  }

  @Post('store')
  @HttpCode(201)
  //@Body adalah decorator utk menampilkan body secara shortcut
  store(@Req() request, @Res({passthrough : true}) response, @Body() createHeroDto :CreateCatDto){
    //response.status(201).json(request.body);
    
    //tampung nilai value
    //const {id, nama, type, gambar} = request.body;
    //push atau simpan nilai value
    // heroes.push({
    //   id,
    //   nama,
    //   type,
    //   gambar
    // })
    //tampilkan kembali datanya
    //return heroes
    
    // {
    //   "data" : request.body,
    // }

    try {
      // const {id, nama, type, gambar} = request.body;
      // heroes.push({
      //   id,
      //   nama,
      //   type,
      //   gambar
      // });
    //return heroes;
    return createHeroDto;
    } catch (error) {
      //Menampilkan response error
      response.status(500).json({message: error});
    }
  }

  @Get('welcome')
  @Redirect('https://docs.nestjs.com/')
  hello(){
    return 'welcome';
  }
}
