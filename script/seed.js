'use strict'

const db = require('../server/db')
const {User, Product, CartItems, Order, Review} = require('../server/db/models')

const cartItemsToSeed = [
  {
    userId: 1,
    productId: 1,
    price: 5399,
    quantity: 2
  },
  {
    userId: 1,
    productId: 2,
    price: 899,
    quantity: 1
  },
  {
    userId: 1,
    productId: 4,
    price: 1499,
    quantity: 2
  },
  {
    userId: 1,
    productId: 1,
    price: 5399,
    quantity: 2,
    orderId: 2
  },
  {
    userId: 2,
    productId: 1,
    quantity: 2,
    price: 5399,
    orderId: 1
  }
]

const reviewsToSeed = [
  {
    userId: 1,
    productId: 1,
    title: 'AWESOME!!',
    content:
      'Best smell ever!! I am extremely happy. This product has cured all my woes and made my skin glow, too.',
    rating: 5
  },
  {
    userId: 2,
    productId: 1,
    title: 'Just okay...',
    content: 'I loved this but wish it was more moisturizing. :(',
    rating: 3
  },
  {
    userId: 3,
    productId: 2,
    title: 'Ugh, no.',
    content:
      'I feel like there is nothing worse in this world than this product. At least it smells nice.',
    rating: 2
  },
  {
    userId: 5,
    productId: 4,
    title: 'Best ever!!',
    content:
      "I loooooved this product! Leaving one star off because there's only a tiny amount in the container. Gimme more!!!",
    rating: 4
  },
  {
    userId: 6,
    productId: 3,
    title: 'My life is now complete.',
    content:
      "YES. I love candles and this was the best $50 I've ever spent on anything in my life.",
    rating: 5
  }
]

const ordersToSeed = [
  {userId: 1, status: 'complete'},
  {userId: 2, status: 'in process'}
]

const usersToSeed = [
  {email: 'cody@email.com', password: '123'},
  {email: 'murphy@email.com', password: '123'},
  {email: 'joejoe@email.com', password: '123'},
  {email: 'anotheruser@email.com', password: '123'},
  {email: 'thisguy@email.com', password: '123'},
  {email: 'ladymacbeth@email.com', password: '123'}
]

const productsToSeed = [
  {
    name: 'Bruise salve',
    description:
      'Soothe your woes after drunken bar fights with organic arnica and shea butter',
    price: 1499,
    category: 'body',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg'
  },
  {
    name: 'Scented Candle',
    description: 'Calming scents of burning wood chips and neroli',
    price: 5399,
    category: 'home',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg'
  },
  {
    name: 'Shower Gel',
    description: 'Lavender scented gel with aloe base',
    price: 899,
    category: 'body',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg'
  },
  {
    name: 'Eye Cream',
    description: 'Roll back the years with pig placenta',
    price: 4499,
    category: 'face',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg'
  },
  {
    name: 'Hand Cream',
    description: 'Rich hand cream with eucalyptus extract',
    price: 1499,
    category: 'body',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png'
  },

  {
    name: 'Landry',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 922,
    category: 'home',
    description:
      'sit laborum adipisicing minim reprehenderit adipisicing culpa elit aliquip officia incididunt ad minim qui in dolore nostrud labore sunt excepteur velit duis in dolore in ipsum incididunt qui occaecat esse veniam eiusmod cillum laboris eu'
  },
  {
    name: 'Dunn',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 3052,
    category: 'body',
    description:
      'aliqua reprehenderit deserunt aliquip excepteur aute quis officia ut qui dolor laboris occaecat ullamco excepteur pariatur laborum in sit sit fugiat occaecat elit labore dolor cupidatat excepteur laborum in velit veniam laborum nulla occaecat eiusmod'
  },
  {
    name: 'Shaffer',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 700,
    category: 'face',
    description:
      'ex commodo consectetur veniam esse minim dolore cupidatat voluptate consequat id magna eu tempor laboris nostrud tempor aliqua exercitation amet cillum aute eu cillum quis nostrud culpa amet Lorem sint ut do incididunt voluptate sunt'
  },
  {
    name: 'Ingram',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 3275,
    category: 'body',
    description:
      'aliquip id Lorem eu dolore velit dolore labore eu cillum duis eu veniam esse culpa sint non ut ea dolor velit deserunt dolor et aliquip ullamco dolore anim ex nulla duis exercitation sint duis mollit'
  },
  {
    name: 'Reilly',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 1489,
    category: 'home',
    description:
      'in do duis voluptate labore enim officia ea ut velit consectetur aliquip proident labore duis anim in aliquip aliquip ipsum ex id veniam sunt aliquip dolore consequat aliqua irure id mollit laboris qui ad ullamco'
  },
  {
    name: 'Santiago',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 2453,
    category: 'home',
    description:
      'ex dolore laborum ipsum aute non ut deserunt et consectetur eu mollit tempor qui nisi fugiat adipisicing proident commodo non proident velit et nisi ipsum laboris labore velit cupidatat sunt quis qui excepteur magna mollit'
  },
  {
    name: 'Payne',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 2726,
    category: 'body',
    description:
      'incididunt minim consequat elit adipisicing minim anim aute enim dolor do nostrud esse anim cillum fugiat ullamco sit esse tempor id labore consequat Lorem elit aute ad consequat velit proident cillum et pariatur sint mollit'
  },
  {
    name: 'Ortega',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 1735,
    category: 'body',
    description:
      'tempor ex consectetur reprehenderit in reprehenderit veniam excepteur voluptate consequat reprehenderit qui veniam consequat proident proident ex sunt esse nisi exercitation ex esse quis aliqua sit minim amet aliquip laborum nulla commodo cillum esse irure'
  },
  {
    name: 'Livingston',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 3066,
    category: 'face',
    description:
      'qui cupidatat irure cillum occaecat mollit et aute sit officia consectetur labore laborum proident veniam pariatur incididunt non consequat nostrud culpa culpa voluptate incididunt eu incididunt nulla do ea amet ullamco in reprehenderit veniam irure'
  },
  {
    name: 'William',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 1768,
    category: 'body',
    description:
      'consectetur non laboris voluptate et velit sunt irure eu aliqua sunt tempor eu aliquip eiusmod elit consectetur deserunt anim elit dolor aliqua sint consectetur nulla consequat anim consectetur minim qui mollit culpa exercitation sint id'
  },
  {
    name: 'Ward',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 2115,
    category: 'home',
    description:
      'in nisi nostrud est deserunt occaecat labore officia mollit deserunt cillum commodo sit ut non dolore sint ea do exercitation aute officia laborum aliqua excepteur do sunt id occaecat labore mollit enim consectetur occaecat esse'
  },
  {
    name: 'Calderon',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 2164,
    category: 'body',
    description:
      'exercitation exercitation nisi deserunt dolor ut incididunt sit adipisicing excepteur occaecat velit laboris esse commodo laboris consectetur aliquip ad duis laborum tempor magna quis ut sint consectetur labore veniam commodo tempor magna fugiat veniam fugiat'
  },
  {
    name: 'Kinney',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 3275,
    category: 'home',
    description:
      'mollit mollit elit esse do pariatur velit duis sint consectetur deserunt est mollit elit ullamco id ex in minim pariatur dolor elit quis aute incididunt Lorem eiusmod irure adipisicing sit quis nostrud occaecat adipisicing est'
  },
  {
    name: 'Perkins',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 627,
    category: 'body',
    description:
      'Lorem occaecat incididunt ut cupidatat ad aute fugiat ipsum tempor laborum duis duis nulla tempor Lorem fugiat sint occaecat enim tempor exercitation consequat pariatur proident sint qui ullamco cillum est ex ex fugiat commodo proident'
  },
  {
    name: 'Kidd',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 2755,
    category: 'home',
    description:
      'aliquip occaecat duis in ea ad amet laborum ad reprehenderit quis dolor elit Lorem laboris ex ut ea et id fugiat duis fugiat esse fugiat ipsum culpa Lorem culpa laboris incididunt minim enim tempor tempor'
  },
  {
    name: 'Miranda',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 2711,
    category: 'home',
    description:
      'minim proident cillum aliquip ea excepteur sint deserunt sit aliqua veniam eiusmod incididunt culpa veniam est officia minim enim commodo culpa commodo aute deserunt eu duis et qui aliquip magna do ad do anim nulla'
  },
  {
    name: 'Stanley',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 2296,
    category: 'body',
    description:
      'fugiat Lorem consectetur tempor sint labore sit deserunt est eiusmod magna nulla nisi culpa dolore eiusmod qui et ea ut adipisicing pariatur dolor exercitation velit proident nostrud est nostrud nostrud eu do consectetur cupidatat ullamco'
  },
  {
    name: 'Jones',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 2482,
    category: 'body',
    description:
      'proident eu irure aute quis enim magna duis Lorem ex tempor id elit ullamco minim tempor Lorem consequat officia consequat non aliqua id qui laborum exercitation commodo consectetur fugiat veniam velit fugiat nisi excepteur nisi'
  },
  {
    name: 'Avila',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 740,
    category: 'face',
    description:
      'id pariatur sunt duis ut eu qui elit ad ex ad et aliqua id deserunt duis est dolore quis minim ut eu amet sint minim pariatur excepteur sint labore commodo aliquip aute dolor eu quis'
  },
  {
    name: 'Wong',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 1892,
    category: 'face',
    description:
      'est consequat mollit incididunt ad ad magna ea exercitation ullamco reprehenderit anim duis mollit do duis ex fugiat in magna commodo mollit ullamco id cupidatat in sint deserunt irure pariatur anim amet ea minim tempor'
  },
  {
    name: 'Fischer',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 2964,
    category: 'face',
    description:
      'enim cupidatat id consectetur enim sint magna aliqua voluptate qui mollit magna magna laborum veniam voluptate laborum officia irure non Lorem qui sint ut laborum cupidatat dolore eu ipsum Lorem sit aute ex est magna'
  },
  {
    name: 'Gutierrez',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 1840,
    category: 'face',
    description:
      'laborum consectetur sint deserunt excepteur tempor reprehenderit sunt aliqua laborum eu mollit occaecat duis sit aliqua id deserunt enim elit amet in laboris consequat commodo cillum ea sunt consectetur sunt sunt incididunt laboris deserunt anim'
  },
  {
    name: 'Terry',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 3599,
    category: 'home',
    description:
      'labore occaecat dolor labore in reprehenderit eiusmod reprehenderit duis cupidatat adipisicing officia ipsum ipsum ex culpa ex est ad magna ex sit aute irure est exercitation voluptate tempor do quis deserunt ullamco elit ea eiusmod'
  },
  {
    name: 'Gould',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 3280,
    category: 'home',
    description:
      'excepteur veniam eiusmod ipsum consequat adipisicing velit Lorem adipisicing labore duis enim magna incididunt nulla magna aliqua consequat in amet Lorem dolore mollit magna reprehenderit incididunt aliquip est mollit proident anim eu consectetur exercitation pariatur'
  },
  {
    name: 'Stephens',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 2254,
    category: 'home',
    description:
      'velit mollit irure ex ipsum eiusmod reprehenderit labore nisi magna consectetur in irure dolore duis veniam in dolor exercitation voluptate dolore veniam ea excepteur nostrud consectetur nisi ipsum aliquip dolor quis aliqua qui proident elit'
  },
  {
    name: 'Rutledge',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 1306,
    category: 'body',
    description:
      'commodo ex ad cillum magna dolore officia duis qui deserunt do Lorem aliqua consectetur aliqua elit dolore sunt eiusmod adipisicing voluptate irure duis nostrud reprehenderit voluptate cupidatat enim excepteur quis ipsum consectetur aute do eu'
  },
  {
    name: 'Lester',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 1221,
    category: 'home',
    description:
      'fugiat reprehenderit ut consectetur id incididunt consequat velit enim amet excepteur veniam sit non do exercitation dolore culpa irure commodo deserunt minim anim cillum et non consequat minim excepteur elit nisi minim ad laboris ullamco'
  },
  {
    name: 'Coffey',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 1623,
    category: 'body',
    description:
      'ad minim occaecat consequat nulla sit ut laborum labore culpa anim sunt id incididunt sunt ea sunt pariatur sunt sunt Lorem in veniam dolor nostrud et quis sit duis eiusmod pariatur magna et magna veniam'
  },
  {
    name: 'Trevino',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 3572,
    category: 'body',
    description:
      'deserunt commodo minim sunt veniam id aliqua dolore sunt sunt aliqua velit in aute nisi officia aliquip mollit amet qui laboris nulla fugiat adipisicing deserunt eu ipsum cupidatat ex deserunt id dolore magna eu cillum'
  },
  {
    name: 'English',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 3085,
    category: 'body',
    description:
      'amet commodo deserunt sint ad aute dolore ad consectetur officia sit velit nulla labore ad nisi quis in ad ut ullamco fugiat aliqua occaecat qui ex eu dolore et exercitation et sunt eu reprehenderit excepteur'
  },
  {
    name: 'Valenzuela',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 1338,
    category: 'body',
    description:
      'aliqua non voluptate mollit ex deserunt reprehenderit minim labore eu nostrud cupidatat ipsum occaecat nulla nostrud duis officia irure exercitation deserunt sint ullamco in id ad officia exercitation deserunt voluptate sint irure labore pariatur sit'
  },
  {
    name: 'Blevins',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 2302,
    category: 'home',
    description:
      'commodo ad enim minim Lorem sint excepteur nostrud eiusmod commodo exercitation deserunt qui non eiusmod laborum amet magna magna qui reprehenderit culpa duis culpa anim eu qui enim laborum culpa exercitation esse ad laborum nulla'
  },
  {
    name: 'Walsh',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 1058,
    category: 'face',
    description:
      'sint aute et do qui et nulla reprehenderit deserunt incididunt ipsum pariatur qui do cillum non sunt eiusmod aliquip enim labore tempor aliqua reprehenderit labore velit nostrud deserunt id pariatur incididunt mollit ad commodo qui'
  },
  {
    name: 'Bridges',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 2837,
    category: 'body',
    description:
      'elit sit commodo eiusmod aute fugiat qui aliqua minim cupidatat aliqua et ipsum et occaecat exercitation in adipisicing nostrud duis aliquip est cillum consequat eiusmod Lorem quis nostrud consectetur cillum nulla id sint et consequat'
  },
  {
    name: 'Nicholson',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 3074,
    category: 'home',
    description:
      'tempor culpa ad ipsum ad laborum deserunt tempor enim culpa irure laboris cillum cupidatat nostrud incididunt culpa ea minim ut exercitation est esse dolore ad eiusmod voluptate proident sint duis occaecat pariatur elit sit aliquip'
  },
  {
    name: 'Mcdowell',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 623,
    category: 'body',
    description:
      'Lorem dolor commodo quis exercitation tempor dolore occaecat et sint ex minim aliquip ut exercitation quis in duis eiusmod duis reprehenderit velit esse officia excepteur enim cupidatat dolore qui cillum irure quis elit anim anim'
  },
  {
    name: 'Sellers',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 2603,
    category: 'face',
    description:
      'cupidatat cupidatat laborum do nulla nulla commodo officia eiusmod sint culpa culpa eu enim sint anim occaecat eu laborum aliqua quis sunt excepteur minim deserunt consectetur nostrud enim id ut proident deserunt veniam adipisicing cupidatat'
  },
  {
    name: 'Wheeler',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 3048,
    category: 'home',
    description:
      'dolor pariatur excepteur duis id nisi cupidatat ipsum consequat dolor minim voluptate aliqua nulla non anim officia enim quis id commodo aliquip velit quis elit consectetur in ex ex magna duis culpa nostrud nulla cillum'
  },
  {
    name: 'Mcfarland',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 1213,
    category: 'body',
    description:
      'Lorem laboris in aliquip adipisicing sint laborum Lorem reprehenderit in fugiat deserunt ut consequat et in et commodo esse do irure est reprehenderit sunt proident mollit aliqua adipisicing aute exercitation consectetur exercitation ipsum velit est'
  },
  {
    name: 'Alvarado',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 1083,
    category: 'home',
    description:
      'duis qui mollit amet aliquip eiusmod nostrud pariatur reprehenderit aliqua duis dolor aliquip esse consequat dolor et Lorem irure anim amet laborum fugiat et excepteur aute ex cillum ex sit deserunt aliqua dolore aliquip ex'
  },
  {
    name: 'Rose',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 2459,
    category: 'face',
    description:
      'ut Lorem adipisicing cupidatat est consequat deserunt id voluptate officia esse ex fugiat sit fugiat ea consectetur aliquip dolor ullamco aliquip consectetur excepteur laboris sunt aute culpa voluptate deserunt anim eiusmod nulla sunt ad Lorem'
  },
  {
    name: 'Calhoun',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 682,
    category: 'home',
    description:
      'commodo laboris consectetur consectetur ipsum ex aute quis nisi occaecat sint in est ipsum cupidatat id do minim ad ut excepteur eu culpa cillum labore culpa quis officia esse ullamco eu eu est non tempor'
  },
  {
    name: 'Flowers',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 611,
    category: 'home',
    description:
      'in sint est consequat exercitation pariatur fugiat nostrud sunt id exercitation cillum ex tempor velit officia laboris et et enim ut deserunt ex enim reprehenderit culpa eu duis sit sunt nostrud adipisicing commodo minim id'
  },
  {
    name: 'Norris',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 728,
    category: 'home',
    description:
      'excepteur est velit occaecat laboris ad sint quis consequat duis eu magna est duis consequat excepteur duis labore quis cillum qui ea est labore tempor ex culpa sit proident reprehenderit officia consectetur velit proident commodo'
  },
  {
    name: 'Chambers',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 1074,
    category: 'home',
    description:
      'duis dolor non consectetur ad ea reprehenderit et incididunt ex aliqua cillum consectetur est incididunt aute eu aliqua aliqua dolore culpa laboris nulla aute dolor quis id excepteur elit laborum quis laboris ea veniam ut'
  },
  {
    name: 'Garrett',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 1722,
    category: 'body',
    description:
      'voluptate cillum labore anim pariatur laborum ipsum minim eu do ipsum aute amet dolore eiusmod eiusmod elit ad laborum laboris velit sint minim sit adipisicing fugiat mollit laborum amet elit officia sunt mollit ex sint'
  },
  {
    name: 'Sullivan',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 2236,
    category: 'home',
    description:
      'labore velit incididunt duis nisi ex ipsum occaecat duis irure magna cillum consectetur ipsum officia id fugiat aute proident deserunt exercitation quis mollit Lorem adipisicing consequat minim dolor esse enim cupidatat deserunt aliquip sint occaecat'
  },
  {
    name: 'Moss',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 2126,
    category: 'face',
    description:
      'voluptate sit pariatur laborum non cupidatat aliquip ea et mollit aliqua id id aliquip eu occaecat aute incididunt aute ad cillum ex dolore incididunt dolor amet culpa est pariatur consequat sunt occaecat ad tempor labore'
  },
  {
    name: 'Pearson',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 2439,
    category: 'face',
    description:
      'excepteur consequat velit commodo mollit cupidatat non minim eu est reprehenderit labore cillum duis fugiat dolor culpa aute consectetur commodo do eiusmod minim consectetur duis cupidatat labore magna veniam aute aliquip ullamco proident eu duis'
  },
  {
    name: 'Mcgowan',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 1881,
    category: 'face',
    description:
      'quis nulla voluptate commodo proident reprehenderit amet dolore commodo mollit irure qui minim et elit incididunt labore do nisi qui et aute commodo qui eu cillum dolor velit duis qui pariatur cupidatat consequat nulla proident'
  },
  {
    name: 'Macdonald',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 2474,
    category: 'home',
    description:
      'dolor non ullamco ex consectetur aute eiusmod velit veniam elit nisi adipisicing minim veniam mollit id in mollit consectetur nostrud voluptate magna irure sit est magna consequat est quis aliqua tempor pariatur officia laborum id'
  },
  {
    name: 'Lewis',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 1312,
    category: 'face',
    description:
      'ullamco officia adipisicing consectetur cupidatat laboris ea eiusmod laborum officia dolore eiusmod aute laborum esse minim incididunt incididunt consequat aliqua irure in et ea proident nulla in ullamco ex ut labore proident esse irure esse'
  },
  {
    name: 'Sawyer',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 2868,
    category: 'face',
    description:
      'cillum Lorem consectetur elit consectetur exercitation ex dolor aute qui nostrud id aliqua minim laboris adipisicing et qui ipsum proident ipsum dolore cupidatat anim dolor aliqua ullamco ut nulla qui pariatur nulla officia tempor est'
  },
  {
    name: 'Roy',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 2701,
    category: 'home',
    description:
      'sunt sunt ex non Lorem esse qui adipisicing mollit reprehenderit quis velit do nisi anim amet elit exercitation nulla culpa pariatur laboris adipisicing aliquip elit consectetur cupidatat ex culpa est incididunt amet aliqua do laboris'
  },
  {
    name: 'Espinoza',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 3222,
    category: 'home',
    description:
      'aute cillum incididunt quis do velit commodo sit tempor laborum excepteur duis nisi nisi pariatur anim proident fugiat nostrud eiusmod anim velit consectetur qui sint irure adipisicing amet magna quis proident nisi enim minim commodo'
  },
  {
    name: 'Albert',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 3294,
    category: 'face',
    description:
      'consequat aliquip cupidatat commodo enim consequat consequat aliqua sint consequat in esse consequat adipisicing velit non elit eiusmod adipisicing mollit id laboris sint aliqua sunt anim occaecat non officia qui sunt qui consectetur est labore'
  },
  {
    name: 'Lee',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 1405,
    category: 'face',
    description:
      'non voluptate dolor aute aliquip commodo cillum et exercitation amet duis dolor quis laboris labore dolore nostrud non voluptate sit irure magna est anim ex ad enim sit esse eiusmod minim Lorem culpa consectetur aute'
  },
  {
    name: 'Carpenter',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 2281,
    category: 'body',
    description:
      'commodo non sint dolor nulla minim aliquip culpa sunt est nulla dolor culpa do id excepteur dolor adipisicing mollit fugiat tempor eu Lorem et labore culpa adipisicing officia nostrud nisi irure Lorem velit commodo cillum'
  },
  {
    name: 'Newman',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 1697,
    category: 'face',
    description:
      'esse minim incididunt elit quis cillum ipsum magna fugiat culpa aute duis amet eu nisi esse sunt reprehenderit velit ea aliqua ad ea laborum occaecat elit id sint fugiat ex ea Lorem fugiat amet anim'
  },
  {
    name: 'Nash',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 3111,
    category: 'body',
    description:
      'ad sint laboris fugiat consequat pariatur amet pariatur eiusmod cillum aliqua eiusmod eiusmod proident labore est labore tempor tempor laboris proident id occaecat officia ad occaecat anim deserunt id veniam adipisicing do Lorem minim occaecat'
  },
  {
    name: 'Hampton',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 1052,
    category: 'body',
    description:
      'labore ad ut incididunt nisi velit non cupidatat id ut adipisicing proident aliquip sit irure aliqua aute sit duis qui dolore do et ea magna cillum minim labore sit ea id do consectetur ea consectetur'
  },
  {
    name: 'Underwood',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 3161,
    category: 'body',
    description:
      'labore enim fugiat pariatur tempor irure officia minim ad nulla dolor ex Lorem incididunt aute quis anim id Lorem occaecat cillum pariatur in excepteur duis eiusmod excepteur anim enim Lorem irure laboris enim pariatur magna'
  },
  {
    name: 'Spears',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 3056,
    category: 'body',
    description:
      'mollit officia nostrud fugiat et fugiat aute eu ad commodo commodo duis proident eiusmod proident nulla velit ullamco exercitation in voluptate Lorem sunt nulla veniam laboris officia voluptate cillum duis duis incididunt esse cillum do'
  },
  {
    name: 'Wall',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 2284,
    category: 'home',
    description:
      'velit do velit proident sit esse in qui excepteur deserunt deserunt non occaecat excepteur Lorem do eu cillum deserunt laboris aliqua ut non culpa cillum mollit ad duis occaecat dolor elit et anim qui et'
  },
  {
    name: 'Woodward',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 1877,
    category: 'body',
    description:
      'Lorem irure cillum sint ipsum Lorem qui fugiat aliqua Lorem ad amet labore dolore ea cupidatat ut non magna occaecat esse quis laboris cillum in fugiat aliquip laboris officia non ullamco enim irure Lorem Lorem'
  },
  {
    name: 'Koch',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 2825,
    category: 'body',
    description:
      'eiusmod ad fugiat ipsum non veniam minim esse in quis commodo aute Lorem exercitation eiusmod tempor tempor sit laboris ullamco officia Lorem est qui magna Lorem nostrud do ad fugiat aute in Lorem velit dolor'
  },
  {
    name: 'Rhodes',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 1458,
    category: 'home',
    description:
      'nisi laborum cupidatat magna et laborum ullamco quis est ut enim consequat veniam dolore laborum nostrud excepteur ad minim aute magna fugiat reprehenderit amet Lorem pariatur et pariatur fugiat esse laborum commodo eiusmod officia aliqua'
  },
  {
    name: 'Houston',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 776,
    category: 'face',
    description:
      'do aliqua voluptate ipsum voluptate anim ad laborum proident veniam ea commodo duis cillum laboris labore nulla aliquip ut excepteur ipsum reprehenderit veniam culpa laboris commodo excepteur ullamco irure ut cupidatat ullamco nisi et nulla'
  },
  {
    name: 'Alexander',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 2393,
    category: 'home',
    description:
      'amet incididunt sit elit et ex do excepteur ipsum dolore nisi irure voluptate esse ut excepteur minim mollit duis duis eiusmod tempor enim officia commodo culpa labore Lorem do irure enim dolor officia elit sint'
  },
  {
    name: 'Brooks',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 1007,
    category: 'body',
    description:
      'consequat excepteur cupidatat sint velit do aliquip magna consectetur sit velit exercitation ut quis cupidatat sunt dolor commodo aliquip nulla ex quis eu sit ea aliquip elit non commodo officia voluptate minim dolor id sint'
  },
  {
    name: 'Martinez',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 2381,
    category: 'home',
    description:
      'pariatur qui incididunt exercitation irure tempor sunt ut ut pariatur et Lorem non reprehenderit nostrud non enim consectetur adipisicing esse reprehenderit exercitation dolor ut commodo nulla laborum officia ea dolor quis in ipsum laboris veniam'
  },
  {
    name: 'Doyle',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 652,
    category: 'home',
    description:
      'aliqua exercitation voluptate labore sint laboris laboris id Lorem mollit laborum sint ullamco aliqua officia eu cupidatat aute consequat do in duis nulla eiusmod elit deserunt adipisicing qui enim dolor laborum officia minim ea do'
  },
  {
    name: 'Robertson',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 2208,
    category: 'face',
    description:
      'ipsum velit minim adipisicing deserunt proident ad exercitation duis culpa officia fugiat sint labore Lorem non ea nisi est consequat mollit dolor qui nulla duis dolor non excepteur enim ut amet laboris ut aliquip ut'
  },
  {
    name: 'Burnett',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 949,
    category: 'body',
    description:
      'amet occaecat pariatur cillum anim fugiat labore consectetur fugiat quis deserunt non tempor elit est adipisicing proident mollit voluptate anim dolor sint qui duis incididunt reprehenderit sit excepteur cillum minim duis commodo aliqua non sit'
  },
  {
    name: 'Dorsey',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 2067,
    category: 'face',
    description:
      'reprehenderit sint dolor est nostrud officia cillum consectetur mollit sunt et quis duis exercitation ullamco anim officia aliqua duis dolore veniam quis officia exercitation quis nulla elit sint tempor ut tempor ex Lorem do velit'
  },
  {
    name: 'Dickson',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg',
    price: 3511,
    category: 'face',
    description:
      'aute ut amet minim qui ea elit cillum id ullamco elit adipisicing eiusmod proident commodo est eiusmod consequat non reprehenderit anim mollit sit sit in dolor pariatur nulla eiusmod eu incididunt reprehenderit officia anim dolore'
  },
  {
    name: 'Acevedo',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 3244,
    category: 'body',
    description:
      'aliqua irure elit do mollit officia nisi culpa ipsum aute veniam dolore velit quis consequat velit ipsum pariatur et nulla consectetur cillum nulla excepteur aute quis esse cillum commodo est velit consectetur ad mollit duis'
  },
  {
    name: 'Reynolds',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 2583,
    category: 'home',
    description:
      'dolore anim consectetur et nisi fugiat nostrud qui reprehenderit velit minim quis anim id quis cillum ut eiusmod do duis cillum consequat velit exercitation id et in laboris voluptate reprehenderit excepteur cillum amet Lorem nostrud'
  },
  {
    name: 'Armstrong',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 2733,
    category: 'face',
    description:
      'culpa quis adipisicing excepteur minim exercitation non velit consequat eu excepteur exercitation dolor enim consequat et dolore reprehenderit sunt fugiat veniam mollit velit est est tempor ut sit laborum elit proident qui consectetur nisi velit'
  },
  {
    name: 'Meyers',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 1475,
    category: 'face',
    description:
      'reprehenderit veniam eiusmod aute magna consectetur ad aliquip labore nisi magna dolor commodo sint mollit mollit in elit dolore sit occaecat irure enim ea amet eu laboris officia amet adipisicing eu consequat est sit tempor'
  },
  {
    name: 'Harvey',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 2616,
    category: 'face',
    description:
      'cillum sunt do id officia culpa duis do nostrud et eu non eiusmod do culpa quis adipisicing esse exercitation incididunt ea quis proident ex nostrud elit dolor eiusmod laborum dolore consequat duis proident est et'
  },
  {
    name: 'Miles',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 2487,
    category: 'body',
    description:
      'velit ipsum eu eiusmod cupidatat labore voluptate incididunt nisi ipsum aute id Lorem aute exercitation irure do cillum pariatur non nisi culpa ad veniam sunt cupidatat proident sunt amet nisi magna sit occaecat deserunt et'
  },
  {
    name: 'Kemp',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 849,
    category: 'face',
    description:
      'reprehenderit cillum in mollit voluptate commodo cupidatat labore nulla tempor deserunt laborum nisi proident dolor tempor nisi ipsum excepteur consectetur ut exercitation ullamco do ipsum ad amet eiusmod excepteur esse tempor amet irure et amet'
  },
  {
    name: 'Steele',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 3212,
    category: 'body',
    description:
      'do laborum officia occaecat ea sit magna laboris ex consectetur sit exercitation Lorem Lorem Lorem reprehenderit sint pariatur aliqua minim deserunt deserunt ut consequat reprehenderit qui ullamco occaecat aute Lorem aliquip Lorem fugiat aliquip labore'
  },
  {
    name: 'Bruce',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 2153,
    category: 'face',
    description:
      'est aute ea deserunt enim consectetur pariatur labore occaecat adipisicing quis ullamco non eu cupidatat in irure eiusmod eu sint enim ex tempor officia incididunt commodo irure elit labore qui voluptate proident sit occaecat elit'
  },
  {
    name: 'French',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 810,
    category: 'face',
    description:
      'occaecat elit cillum mollit ullamco enim nostrud non do mollit laborum reprehenderit magna eiusmod excepteur velit Lorem esse minim anim cillum sit nostrud ut magna eu duis nostrud aliquip officia consequat exercitation minim sint qui'
  },
  {
    name: 'Holmes',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 2912,
    category: 'body',
    description:
      'exercitation est enim labore id mollit aliqua irure ullamco sint aliqua sint culpa id dolor minim velit quis qui deserunt consectetur sunt minim et do do culpa aute exercitation elit in consectetur cillum laboris velit'
  },
  {
    name: 'Cole',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 3548,
    category: 'home',
    description:
      'duis culpa duis reprehenderit eiusmod labore fugiat ea sint aute tempor irure labore qui et cupidatat excepteur mollit ullamco labore magna incididunt excepteur anim ex sunt reprehenderit incididunt cillum ullamco esse veniam Lorem Lorem qui'
  },
  {
    name: 'Crane',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 1172,
    category: 'face',
    description:
      'fugiat minim anim elit irure irure excepteur dolore irure aute eiusmod ea sint sunt dolor enim fugiat est sint consectetur incididunt laboris sint nisi culpa sint duis officia ad fugiat est exercitation elit enim consequat'
  },
  {
    name: 'Middleton',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 1409,
    category: 'body',
    description:
      'labore pariatur laborum dolor consequat aliquip consectetur cupidatat incididunt officia deserunt reprehenderit amet nisi ex nostrud esse ad qui deserunt nisi tempor consectetur consectetur voluptate est labore duis est pariatur nisi quis eu voluptate consectetur'
  },
  {
    name: 'Keller',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 3373,
    category: 'face',
    description:
      'duis mollit ex cupidatat veniam consequat qui dolore eiusmod do ex laborum veniam nisi incididunt adipisicing veniam exercitation aliqua commodo excepteur et anim laboris laborum elit fugiat nostrud magna consectetur aliquip culpa ex magna exercitation'
  },
  {
    name: 'Morse',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 1853,
    category: 'body',
    description:
      'culpa non aliquip ad ad ad elit exercitation minim enim est exercitation deserunt commodo nostrud exercitation cillum reprehenderit do nostrud elit ad nostrud qui non amet laboris qui ea elit irure occaecat officia ex eiusmod'
  },
  {
    name: 'Fuentes',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 992,
    category: 'body',
    description:
      'labore sunt occaecat incididunt voluptate ullamco consequat do aute incididunt mollit magna enim eu veniam exercitation fugiat laboris eiusmod elit culpa ut est consectetur cupidatat non qui dolore elit laborum proident irure deserunt est laboris'
  },
  {
    name: 'Barker',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 3291,
    category: 'face',
    description:
      'do occaecat qui veniam amet excepteur nulla magna quis commodo ex nisi tempor aliquip adipisicing tempor in ipsum mollit aliqua eiusmod minim ad minim incididunt aliquip proident aliqua occaecat voluptate enim commodo dolore eiusmod id'
  },
  {
    name: 'Gonzales',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 1061,
    category: 'home',
    description:
      'sit consectetur sit ex proident ea velit Lorem consequat dolore dolor sint consequat irure nostrud deserunt dolor Lorem duis occaecat deserunt cupidatat Lorem nostrud sit amet enim ea elit deserunt esse ipsum est nisi commodo'
  },
  {
    name: 'Wilder',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 2114,
    category: 'body',
    description:
      'non duis ex officia eu in dolor incididunt excepteur irure deserunt irure cillum excepteur occaecat quis proident enim voluptate reprehenderit tempor commodo aliqua nostrud enim Lorem anim veniam ullamco aliqua amet magna duis cupidatat magna'
  },
  {
    name: 'Ewing',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg',
    price: 3033,
    category: 'body',
    description:
      'dolore nisi veniam quis amet ullamco laboris labore excepteur nisi amet non aliquip duis id Lorem commodo aute officia cillum duis duis amet adipisicing nisi commodo veniam velit enim ullamco dolore non et in excepteur'
  },
  {
    name: 'Cooley',
    imageUrl: 'https://i.ibb.co/4WM5tJj/hand-cream.png',
    price: 822,
    category: 'face',
    description:
      'consequat tempor amet veniam nisi consequat sit cillum cillum velit in ex esse officia fugiat enim sit qui officia nulla minim ea ex ullamco proident ut aute est tempor ad qui non nulla do veniam'
  },
  {
    name: 'Jacobs',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg',
    price: 3073,
    category: 'home',
    description:
      'ut laboris quis eiusmod sit deserunt ad eiusmod dolore sint officia proident dolor voluptate ut et consectetur laborum commodo sunt minim elit ea ullamco nisi aliquip proident incididunt nostrud cupidatat officia nulla fugiat amet id'
  },
  {
    name: 'Whitehead',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg',
    price: 3188,
    category: 'face',
    description:
      'pariatur labore ad voluptate in sit fugiat dolor adipisicing proident proident cupidatat consectetur tempor labore ad tempor exercitation in aliqua veniam officia deserunt laborum cupidatat esse amet do nisi do id ut Lorem laborum laboris'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all(usersToSeed.map(user => User.create(user)))
  const products = await Promise.all(
    productsToSeed.map(product => Product.create(product))
  )
  const orders = await Promise.all(
    ordersToSeed.map(order => Order.create(order))
  )
  const cartItems = await Promise.all(
    cartItemsToSeed.map(items => CartItems.create(items))
  )

  const reviews = await Promise.all(
    reviewsToSeed.map(review => Review.create(review))
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)

  console.log(`seeded successfully`)
}

// We've separated the `` function from the `run` function.
// This way we can isolate the error handling and exit trapping.
// The `` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `` function, IF we ran this module directly (`node `).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of ``.
if (module === require.main) {
  runSeed()
}

// we export the  function for testing purposes (see `./.spec.js`)
module.exports = seed
