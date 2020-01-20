'use strict'

const db = require('../server/db')
const {User, Product, CartItems, Order} = require('../server/db/models')

const cartItemsToSeed = [
  {
    userId: 1,
    productId: 1,
    quantity: 2
  },
  {
    userId: 1,
    productId: 2,
    quantity: 1
  },
  {
    userId: 1,
    productId: 4,
    quantity: 2
  },
  {
    userId: 1,
    productId: 1,
    quantity: 2,
    orderId: 1
  }
]

const ordersToSeed = [
  {userId: 1, status: 'complete'},
  {userId: 2, status: 'in process'}
]

const usersToSeed = [
  {email: 'cody@email.com', password: '123'},
  {email: 'murphy@email.com', password: '123'}
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
    name: 'Henry',
    description:
      'Nisi minim tempor do duis in anim ad sunt sit sint eu. Incididunt sint eiusmod deserunt exercitation do eu nulla ipsum sint. Reprehenderit commodo fugiat occaecat mollit. Elit tempor anim excepteur Lorem reprehenderit. Id labore adipisicing deserunt aliquip pariatur quis Lorem adipisicing commodo anim.\r\n',
    price: 3052,
    category: 'aute'
  },
  {
    name: 'Finch',
    description:
      'Adipisicing mollit mollit consectetur culpa labore anim esse mollit in irure laborum. Officia est aliqua esse laboris veniam amet incididunt voluptate irure veniam. Amet labore fugiat dolor tempor id Lorem elit proident eiusmod dolor aute ullamco nostrud cillum. Aliqua do sint aute nisi nisi laborum eu consectetur sit dolore velit. Incididunt magna adipisicing excepteur commodo.\r\n',
    price: 3548,
    category: 'in'
  },
  {
    name: 'Berry',
    description:
      'Aute nisi ut enim aliqua laboris labore. Consectetur fugiat eu nulla enim officia ad eiusmod. Dolor officia adipisicing Lorem ullamco qui minim adipisicing.\r\n',
    price: 534,
    category: 'eu'
  },
  {
    name: 'Huffman',
    description:
      'Nulla elit sint incididunt id duis nulla sint commodo pariatur enim Lorem elit reprehenderit nisi. Ad in aliquip laboris quis nostrud minim eu culpa mollit. Ad pariatur ullamco id nisi fugiat velit irure et laboris quis est.\r\n',
    price: 2409,
    category: 'adipisicing'
  },
  {
    name: 'Henrietta',
    description:
      'Proident minim in nisi anim enim. Tempor elit non qui quis commodo ad dolor voluptate. Nostrud adipisicing nisi enim nostrud ut aute enim nisi fugiat consectetur fugiat esse. Officia laborum veniam sit dolore aute magna. Pariatur magna pariatur minim ex ad veniam quis non. Anim voluptate laborum laboris labore eiusmod in. Do reprehenderit nisi id esse.\r\n',
    price: 1110,
    category: 'irure'
  },
  {
    name: 'Goodwin',
    description:
      'Sunt ea nisi anim reprehenderit excepteur incididunt laborum fugiat consequat non. Proident laborum cupidatat consectetur fugiat occaecat qui eu minim aute proident. Eu mollit et adipisicing officia deserunt ullamco ut est culpa nulla. Cillum magna nulla occaecat incididunt incididunt excepteur magna ea amet ut elit velit enim. Ad dolor commodo nulla ea aliqua aute.\r\n',
    price: 2787,
    category: 'et'
  },
  {
    name: 'Amie',
    description:
      'Magna ex amet aute aliqua duis voluptate veniam reprehenderit. Reprehenderit anim eu laborum non amet dolore culpa do. Amet nulla excepteur ut exercitation id anim. Est elit anim duis magna adipisicing enim. Velit tempor do in commodo aute officia. Et reprehenderit ea consequat incididunt amet excepteur adipisicing proident nulla.\r\n',
    price: 1310,
    category: 'et'
  },
  {
    name: 'Loraine',
    description:
      'Aliquip eiusmod ipsum occaecat proident consectetur culpa elit exercitation dolor dolore voluptate. Do ad irure reprehenderit pariatur ea culpa veniam minim. Esse culpa veniam aliqua velit officia deserunt.\r\n',
    price: 1558,
    category: 'anim'
  },
  {
    name: 'Della',
    description:
      'Aliqua ut sunt excepteur adipisicing anim sunt consequat sunt nisi ad consequat sint. Laboris cupidatat sunt nisi officia et excepteur nostrud nulla incididunt qui do. In proident eiusmod incididunt aute deserunt amet eu adipisicing consectetur. Ut non velit ea est adipisicing excepteur. Nisi in pariatur quis pariatur nisi proident labore dolore est est. Cillum quis cillum exercitation aute qui velit velit amet sint velit ipsum ipsum sint.\r\n',
    price: 3942,
    category: 'non'
  },
  {
    name: 'Darla',
    description:
      'Magna laborum voluptate laborum Lorem incididunt veniam dolore tempor duis. Esse excepteur aute quis ut anim. Tempor id veniam eiusmod voluptate. Id non laboris esse labore deserunt anim aliqua commodo. Tempor ullamco elit quis aute excepteur minim nostrud amet laborum magna ipsum do. Ea nulla sunt non laboris qui dolor adipisicing nulla magna mollit irure elit est. Aute id commodo consectetur dolor mollit reprehenderit nostrud esse nostrud elit duis non do mollit.\r\n',
    price: 3511,
    category: 'ut'
  },
  {
    name: 'Williams',
    description:
      'Ad qui eu exercitation pariatur est irure amet nulla irure anim magna enim non. Culpa occaecat pariatur adipisicing nostrud deserunt commodo reprehenderit laborum exercitation aliquip proident consectetur. Aliquip adipisicing exercitation velit ut ea dolore in ipsum quis commodo. Tempor nisi pariatur aliquip laborum ea culpa est excepteur laborum in anim. Reprehenderit cillum nisi exercitation sunt est aliqua commodo ipsum in in incididunt irure cupidatat. Voluptate sit quis aliquip reprehenderit ad. Adipisicing excepteur et ex nisi cillum amet aliquip nisi esse ut do ullamco culpa occaecat.\r\n',
    price: 1130,
    category: 'in'
  },
  {
    name: 'Winters',
    description:
      'Irure voluptate laborum minim sunt et. Non adipisicing nulla aliquip pariatur officia do irure eu pariatur eu. Mollit labore veniam amet anim labore qui labore minim officia esse. Duis ut veniam ipsum sit voluptate elit cillum laborum eiusmod in cillum aliquip consequat incididunt. Et ullamco veniam ipsum amet fugiat irure voluptate.\r\n',
    price: 2924,
    category: 'mollit'
  },
  {
    name: 'Dona',
    description:
      'Anim adipisicing ex quis pariatur pariatur laborum nostrud eiusmod magna incididunt commodo elit proident. Lorem Lorem voluptate aliqua amet fugiat minim eu ea quis aliqua esse enim anim. Aliquip veniam non sint eiusmod proident aliqua nostrud ipsum Lorem reprehenderit. Qui occaecat tempor quis magna aliquip dolor aute tempor velit commodo commodo.\r\n',
    price: 2493,
    category: 'eiusmod'
  },
  {
    name: 'Gertrude',
    description:
      'Commodo culpa dolore aute velit mollit ex duis cupidatat reprehenderit minim nisi. Occaecat enim qui exercitation culpa culpa quis enim sint adipisicing do eu dolore. Amet adipisicing incididunt elit mollit consequat dolor cupidatat mollit veniam consectetur duis reprehenderit aliquip. Mollit duis deserunt cillum tempor esse sunt laborum. Nostrud nisi Lorem sunt aute laboris.\r\n',
    price: 3673,
    category: 'quis'
  },
  {
    name: 'Hays',
    description:
      'Deserunt pariatur in officia est cupidatat aliquip velit excepteur. In consectetur Lorem do ullamco non consequat magna nisi cupidatat incididunt id. Amet culpa dolor cupidatat ullamco cillum incididunt voluptate cillum tempor. Ea culpa anim ea enim labore sunt velit commodo.\r\n',
    price: 990,
    category: 'aliquip'
  },
  {
    name: 'English',
    description:
      'Commodo enim elit ad Lorem eiusmod incididunt adipisicing sint ad. Laborum aliqua aliquip exercitation consectetur deserunt ea incididunt magna labore culpa. Est adipisicing eiusmod aliquip quis proident tempor culpa proident ad sint do dolore. Dolore do in ad culpa eu consectetur. Magna fugiat id nisi qui esse mollit enim officia aliquip mollit tempor non reprehenderit. Non mollit aute duis non id velit.\r\n',
    price: 1391,
    category: 'nostrud'
  },
  {
    name: 'Long',
    description:
      'Pariatur voluptate esse pariatur officia incididunt mollit excepteur non minim enim quis voluptate adipisicing culpa. Et deserunt aliqua consectetur voluptate ipsum laboris. Et Lorem incididunt velit ullamco do sunt laborum elit occaecat cupidatat nostrud proident.\r\n',
    price: 2545,
    category: 'mollit'
  },
  {
    name: 'April',
    description:
      'Lorem voluptate Lorem adipisicing cillum proident enim aliquip consequat sit. Enim eu fugiat anim in officia sunt eu velit adipisicing culpa non ipsum aute ad. Ad magna adipisicing eiusmod tempor nostrud fugiat cupidatat.\r\n',
    price: 3290,
    category: 'irure'
  },
  {
    name: 'Delores',
    description:
      'In ut reprehenderit proident ullamco aliquip esse. Dolor ex nostrud ad nostrud irure minim consectetur dolore. Fugiat laboris mollit tempor quis id nisi magna dolor excepteur. Nisi velit id nisi ad sit dolor pariatur commodo magna excepteur in cupidatat cupidatat mollit. Officia esse sint laboris ullamco commodo culpa incididunt laboris tempor proident. Laboris nulla magna officia sit proident elit Lorem et nisi duis.\r\n',
    price: 2207,
    category: 'excepteur'
  },
  {
    name: 'Lucille',
    description:
      'Irure irure irure aliquip eu laboris. Cupidatat aliquip dolore aliqua dolore est eiusmod est. Quis ut elit dolore cupidatat qui id laboris occaecat nisi. Sint eiusmod culpa incididunt consectetur voluptate eiusmod. Ex nisi aute tempor nostrud duis excepteur. Sunt nostrud eu eiusmod labore reprehenderit eu consequat occaecat elit ullamco deserunt laborum.\r\n',
    price: 1949,
    category: 'enim'
  },
  {
    name: 'Sadie',
    description:
      'Lorem mollit excepteur mollit aliqua qui nostrud incididunt non in duis do deserunt ullamco. Ex laboris irure ex culpa excepteur velit culpa nulla voluptate magna eiusmod sint mollit. In aute cupidatat sit deserunt nostrud proident. Laborum cupidatat adipisicing mollit magna. Esse quis ut cillum ad ex. Do esse ad aliquip ipsum veniam adipisicing magna consectetur ad.\r\n',
    price: 3859,
    category: 'est'
  },
  {
    name: 'Alfreda',
    description:
      'Lorem nostrud consectetur ipsum nulla proident eiusmod incididunt officia qui eu. Reprehenderit dolor duis quis eu anim id duis sint duis consectetur tempor non reprehenderit amet. Excepteur velit labore commodo nulla in officia ea excepteur incididunt non voluptate.\r\n',
    price: 437,
    category: 'sunt'
  },
  {
    name: 'Jensen',
    description:
      'Esse nulla quis dolor ad. Pariatur amet duis consectetur est incididunt culpa nostrud occaecat. Laborum commodo enim aliquip est ipsum nostrud est mollit elit laboris. Adipisicing officia adipisicing esse enim nulla ut amet consequat veniam veniam incididunt. Ex cillum labore amet fugiat consequat fugiat elit mollit sunt anim et. Fugiat est adipisicing exercitation cupidatat enim eiusmod deserunt. Labore commodo enim duis aliqua ex.\r\n',
    price: 2519,
    category: 'excepteur'
  },
  {
    name: 'Carly',
    description:
      'Esse qui consectetur ea commodo dolore elit eu est. Eiusmod ut sunt mollit consectetur deserunt consequat id nisi laboris exercitation incididunt aliquip. Voluptate veniam incididunt amet eiusmod ullamco Lorem in deserunt. Ad cillum incididunt enim excepteur do ex. Laboris sint ipsum veniam aute irure sit Lorem ipsum eu. Minim non et enim nulla consequat cillum sit veniam consectetur esse. Sit labore culpa Lorem aute proident irure dolore deserunt culpa dolor irure dolor tempor pariatur.\r\n',
    price: 365,
    category: 'anim'
  },
  {
    name: 'Montgomery',
    description:
      'Velit dolor sit aliquip sit excepteur. Officia sunt culpa est ipsum amet duis ex commodo sint quis pariatur amet fugiat duis. Voluptate sunt dolore qui consequat non aute fugiat officia irure. Proident aliquip aliquip consequat ea culpa.\r\n',
    price: 1864,
    category: 'aliquip'
  },
  {
    name: 'Francis',
    description:
      'Irure consequat qui elit officia non. Do aliquip eu exercitation irure ut sit occaecat laboris exercitation. Exercitation Lorem minim voluptate anim pariatur ut exercitation non officia Lorem pariatur. Labore dolore reprehenderit officia sunt id tempor reprehenderit fugiat. Enim nostrud fugiat dolore nisi ipsum. Duis minim tempor est tempor esse voluptate id adipisicing magna dolore mollit dolore sunt aliquip. Laboris deserunt id ea mollit ut mollit anim ad labore nulla excepteur exercitation.\r\n',
    price: 2067,
    category: 'Lorem'
  },
  {
    name: 'Castaneda',
    description:
      'Ea adipisicing magna cillum laborum voluptate magna elit irure incididunt. Eiusmod mollit exercitation et mollit. Qui cillum laborum nisi ex incididunt ullamco et fugiat ex culpa ea minim excepteur. Fugiat exercitation officia sint est aliqua exercitation velit.\r\n',
    price: 513,
    category: 'ipsum'
  },
  {
    name: 'Holly',
    description:
      'Veniam commodo id reprehenderit eiusmod minim dolore. Commodo est anim fugiat in. Do proident exercitation est duis ipsum cupidatat ut aliqua ea irure nisi voluptate. Lorem culpa pariatur id ex proident mollit adipisicing reprehenderit eiusmod excepteur velit. Fugiat enim Lorem voluptate sint irure exercitation quis consectetur cupidatat reprehenderit in aute eu.\r\n',
    price: 3472,
    category: 'irure'
  },
  {
    name: 'Kidd',
    description:
      'Est incididunt consequat in cillum labore laborum fugiat in incididunt nisi. Elit eu reprehenderit sit incididunt minim labore nulla labore esse quis eiusmod velit aute nostrud. Consectetur in deserunt culpa sit. Laboris minim aliquip duis occaecat fugiat labore fugiat nostrud ea commodo quis quis deserunt ad.\r\n',
    price: 3010,
    category: 'dolor'
  },
  {
    name: 'Riley',
    description:
      'Eiusmod sunt in deserunt excepteur cillum enim occaecat id occaecat et dolore excepteur. Commodo officia deserunt cillum pariatur. Laborum fugiat laboris culpa reprehenderit veniam non eiusmod do ut minim commodo Lorem. Dolore ut amet officia dolor ea. Esse mollit deserunt dolor et est quis minim dolor aute. Quis qui minim nostrud ut excepteur occaecat laboris eiusmod excepteur consequat minim. Proident pariatur voluptate cupidatat elit fugiat proident consectetur pariatur aliquip excepteur.\r\n',
    price: 1584,
    category: 'labore'
  },
  {
    name: 'Mann',
    description:
      'Voluptate nulla minim excepteur id velit consequat. Ut cupidatat voluptate mollit excepteur tempor. Et adipisicing aliqua aliqua quis duis anim qui velit do velit occaecat dolore proident. Laborum enim esse ut excepteur incididunt proident aliqua laboris in elit eu. Qui labore aliquip amet occaecat Lorem do. Duis ut fugiat sit deserunt veniam ullamco amet dolor enim.\r\n',
    price: 988,
    category: 'sit'
  },
  {
    name: 'Mckee',
    description:
      'Id sunt enim dolor tempor. Adipisicing irure proident nisi pariatur nostrud ullamco est aute velit. Ullamco deserunt cupidatat ea labore ullamco commodo cillum. Magna minim id nulla eiusmod Lorem magna nisi id cupidatat. Adipisicing nisi dolor duis amet consectetur cillum mollit voluptate veniam in anim sit id Lorem.\r\n',
    price: 2698,
    category: 'eiusmod'
  },
  {
    name: 'Marylou',
    description:
      'Fugiat sit sit non Lorem Lorem. Adipisicing cupidatat cupidatat fugiat nostrud laborum non. Lorem cillum quis cupidatat sit duis adipisicing fugiat adipisicing officia. Veniam dolor magna ea proident. Enim mollit ex reprehenderit amet ad anim eu sint ut sint fugiat magna.\r\n',
    price: 1027,
    category: 'velit'
  },
  {
    name: 'Steele',
    description:
      'Ad anim labore qui elit ullamco. Duis nulla quis minim ea culpa ad. Non eu culpa qui est irure adipisicing laborum labore do reprehenderit aute culpa laborum sit. Labore laborum reprehenderit mollit occaecat occaecat ad Lorem consequat. Commodo nostrud incididunt amet fugiat ea. Lorem veniam duis in adipisicing.\r\n',
    price: 2870,
    category: 'irure'
  },
  {
    name: 'Ericka',
    description:
      'Pariatur nostrud sint commodo et enim labore aute velit anim ut. Sunt esse pariatur reprehenderit aliqua in aute laboris cillum pariatur minim Lorem. Sint veniam id qui consequat fugiat incididunt sit non magna.\r\n',
    price: 452,
    category: 'ea'
  },
  {
    name: 'Medina',
    description:
      'Do quis enim ipsum amet dolore proident Lorem consectetur cillum ullamco cupidatat ad. Proident ut reprehenderit cupidatat voluptate. Aliquip incididunt nostrud magna veniam qui eu nulla nostrud ut. Velit veniam deserunt incididunt duis nostrud cupidatat cillum eu ipsum nulla id. Veniam pariatur ut minim minim amet enim aute eiusmod nostrud duis nisi pariatur ullamco. Anim magna labore reprehenderit quis.\r\n',
    price: 1911,
    category: 'aliquip'
  },
  {
    name: 'Kirkland',
    description:
      'Proident qui incididunt pariatur voluptate et quis. Deserunt fugiat aliqua do eu eu occaecat dolore aliqua. Nostrud eu voluptate ad et pariatur aliquip magna reprehenderit cillum velit irure deserunt dolor.\r\n',
    price: 1818,
    category: 'labore'
  },
  {
    name: 'Nona',
    description:
      'Sit ea officia sunt adipisicing ea reprehenderit qui nulla consequat. Deserunt occaecat amet ut nostrud est tempor nulla aliquip dolore sit minim anim consectetur eiusmod. Reprehenderit labore aliquip reprehenderit pariatur qui incididunt dolore aliqua officia. Veniam ut non exercitation in fugiat quis voluptate voluptate. Quis Lorem do magna nisi cillum magna irure duis eiusmod sint eu.\r\n',
    price: 3700,
    category: 'ad'
  },
  {
    name: 'Ada',
    description:
      'Lorem sunt qui ex dolor proident sint culpa exercitation. Dolore irure laborum dolor eu nisi proident. Aute pariatur cillum veniam velit elit sunt. Excepteur nisi aute exercitation minim fugiat. Velit do aute sit reprehenderit sint reprehenderit ex pariatur dolor ullamco est pariatur sit. Consectetur anim ut nostrud eu. Adipisicing elit laboris veniam labore labore in ad magna aute culpa proident.\r\n',
    price: 1000,
    category: 'fugiat'
  },
  {
    name: 'Ella',
    description:
      'Commodo et sunt aute nulla ad fugiat ullamco esse ipsum nostrud anim est dolore. Officia culpa irure sint veniam proident et velit. Aute deserunt proident reprehenderit minim excepteur pariatur quis ullamco commodo. In cupidatat eiusmod officia nulla Lorem eu ex consectetur excepteur et aliqua. Laborum culpa do esse cupidatat excepteur commodo incididunt irure consequat proident culpa magna est.\r\n',
    price: 2627,
    category: 'fugiat'
  },
  {
    name: 'Hill',
    description:
      'Excepteur dolor quis irure commodo proident. Eu in occaecat do reprehenderit irure magna labore ad. Aute mollit irure exercitation sint Lorem dolore dolore magna laboris deserunt officia mollit amet esse. Exercitation incididunt ex mollit velit ut officia in ullamco voluptate irure cupidatat voluptate reprehenderit. Reprehenderit aute mollit sit excepteur do irure laboris ex sit sunt consequat cillum est.\r\n',
    price: 2416,
    category: 'dolore'
  },
  {
    name: 'Catalina',
    description:
      'Deserunt fugiat est id magna reprehenderit. Minim laboris fugiat et dolore nisi anim in minim veniam. Cillum consequat dolore voluptate ut pariatur adipisicing est ullamco fugiat cillum tempor. Elit pariatur proident velit et est pariatur duis officia.\r\n',
    price: 993,
    category: 'aliqua'
  },
  {
    name: 'Levy',
    description:
      'Incididunt deserunt voluptate fugiat proident incididunt amet aliqua deserunt Lorem culpa. Dolore non qui do ad in voluptate ea consequat do labore consectetur. Occaecat laboris occaecat culpa id ea aute commodo eu mollit in in.\r\n',
    price: 3337,
    category: 'adipisicing'
  },
  {
    name: 'Hanson',
    description:
      'Quis consequat incididunt est esse fugiat culpa sunt nostrud culpa commodo eiusmod occaecat. Occaecat non aute sunt do adipisicing ad non sint voluptate. Non eiusmod voluptate laboris culpa labore elit ea exercitation magna. Veniam fugiat voluptate aliqua sint sit pariatur. Duis dolor do id minim anim esse exercitation commodo mollit laborum veniam mollit aliqua. Cupidatat consectetur ullamco est esse nostrud amet pariatur occaecat. Est exercitation aute irure consequat irure officia.\r\n',
    price: 1179,
    category: 'esse'
  },
  {
    name: 'Christy',
    description:
      'Et non non commodo aliquip eiusmod exercitation id minim laborum ad do est culpa incididunt. Laborum cupidatat ipsum pariatur excepteur occaecat non amet dolor magna nulla velit eu qui sit. Dolor commodo quis aliqua dolore elit anim minim nulla. Consequat labore incididunt nulla dolor nulla tempor ad aliquip occaecat magna. Et fugiat duis cillum eiusmod. Velit sint cillum voluptate dolor sunt aute ullamco culpa labore veniam id ex labore consequat.\r\n',
    price: 780,
    category: 'qui'
  },
  {
    name: 'Carrie',
    description:
      'Tempor occaecat duis cillum nulla sint non veniam aute velit deserunt. Aliqua irure amet reprehenderit nostrud. Ea sit amet culpa ad consectetur eu nulla elit incididunt nulla. Pariatur eiusmod proident do aliquip aliquip anim in officia quis ipsum laborum. Laboris velit in consectetur sunt dolor in aliqua do et voluptate nostrud commodo irure magna.\r\n',
    price: 1954,
    category: 'laboris'
  },
  {
    name: 'Walters',
    description:
      'Qui commodo sunt ex occaecat reprehenderit excepteur commodo aute anim excepteur proident. Excepteur quis officia magna qui. Amet voluptate elit id dolor qui irure aute. Occaecat elit labore quis ullamco nulla laboris occaecat sint id ad consectetur ut.\r\n',
    price: 1995,
    category: 'commodo'
  },
  {
    name: 'Leanna',
    description:
      'Eiusmod sunt duis nulla commodo mollit ea id esse id enim voluptate elit nulla nostrud. Aliquip anim mollit est ex in. Exercitation officia nostrud qui proident elit amet aliquip do esse voluptate dolor consectetur. Est sunt reprehenderit deserunt laboris in et nostrud adipisicing do ullamco. Incididunt eu sit Lorem culpa non in ullamco pariatur consectetur culpa Lorem.\r\n',
    price: 289,
    category: 'cupidatat'
  },
  {
    name: 'Mccarthy',
    description:
      'Voluptate exercitation mollit qui qui. Duis magna elit deserunt qui consectetur. Irure commodo aliqua laborum anim in proident ut voluptate id excepteur amet duis adipisicing. Duis aliquip aute irure quis sint cillum labore eu consequat est do exercitation.\r\n',
    price: 2020,
    category: 'officia'
  },
  {
    name: 'Laura',
    description:
      'In duis exercitation voluptate ea deserunt nisi cillum ullamco ut nostrud ex fugiat. Anim commodo aliquip labore sint nulla et nisi. Amet reprehenderit reprehenderit ullamco id tempor enim qui veniam officia proident. Exercitation cillum magna amet incididunt in eiusmod consectetur eiusmod irure tempor id irure voluptate. Id quis dolor enim amet amet. Velit Lorem tempor esse magna officia magna reprehenderit est aliqua adipisicing. Aute fugiat reprehenderit reprehenderit exercitation dolore est non laboris.\r\n',
    price: 2812,
    category: 'ipsum'
  },
  {
    name: 'Liza',
    description:
      'Sint elit ut sint minim. Aliqua ea elit occaecat nostrud voluptate. Mollit duis nulla enim consequat in Lorem. Minim eu non labore adipisicing esse aute tempor adipisicing ut consequat consequat sint.\r\n',
    price: 3954,
    category: 'magna'
  },
  {
    name: 'Maryellen',
    description:
      'Magna duis exercitation sunt nulla aliquip et quis ad et nostrud dolore irure. Laboris aliquip aliqua aliqua do esse et. Pariatur ea cupidatat labore minim ea esse reprehenderit ad ea ex labore est qui. Eu excepteur ipsum mollit cillum non amet. Ex veniam officia eiusmod labore id eiusmod culpa est ex. Tempor est magna tempor in qui velit quis aute laborum sit ullamco laboris adipisicing aliquip.\r\n',
    price: 2938,
    category: 'tempor'
  },
  {
    name: 'Penelope',
    description:
      'Cupidatat enim laboris ex consequat culpa anim sunt commodo dolore ad. Veniam consequat ea eu cupidatat deserunt sunt sit aliquip eu commodo fugiat ipsum. Adipisicing eiusmod aliquip do culpa pariatur ut elit enim incididunt aute ex. Aliqua eu excepteur nostrud aliqua. Esse consectetur ipsum veniam officia qui ipsum consectetur culpa proident sunt proident officia in incididunt. Velit consequat eu eiusmod cupidatat sint aliqua est ut.\r\n',
    price: 686,
    category: 'officia'
  },
  {
    name: 'Swanson',
    description:
      'Nisi adipisicing minim irure eiusmod veniam excepteur exercitation quis ad dolore cupidatat proident nulla minim. Dolor culpa et cillum adipisicing ad. Ipsum aute incididunt pariatur dolor veniam officia occaecat ad. Occaecat non ex sint incididunt do ipsum nulla et ex in duis in cillum. Cupidatat occaecat eu deserunt occaecat ex. Minim proident laboris nostrud cillum amet sit mollit aliquip nostrud ullamco veniam qui. Aute sit sint nulla amet ullamco qui incididunt ipsum laborum dolore dolor.\r\n',
    price: 3661,
    category: 'cupidatat'
  },
  {
    name: 'Dianna',
    description:
      'Laborum ut ipsum amet nulla velit nulla minim officia officia ut. Qui elit velit magna ex id tempor ut sit dolor exercitation eiusmod. Ad in voluptate consectetur anim sit exercitation Lorem enim. Est dolor commodo enim enim do consequat eu consectetur cillum. Incididunt do incididunt incididunt aliquip cupidatat.\r\n',
    price: 2246,
    category: 'eiusmod'
  },
  {
    name: 'Letha',
    description:
      'Amet culpa enim veniam occaecat non est adipisicing. Aute sint et id aliqua exercitation incididunt mollit sit. Ipsum cupidatat nisi nisi consequat esse labore eiusmod tempor pariatur ullamco elit reprehenderit. Sit nulla cupidatat fugiat mollit ut tempor. Minim minim nostrud excepteur ut voluptate elit nisi.\r\n',
    price: 2760,
    category: 'magna'
  },
  {
    name: 'Faye',
    description:
      'Velit nisi ullamco id ut cupidatat enim et. Labore et incididunt occaecat nulla anim laborum ipsum esse deserunt nisi velit dolore est duis. Culpa non sint nostrud consectetur occaecat ullamco irure est et officia incididunt minim. Ut veniam cillum sint magna laborum officia anim eiusmod nulla aute est enim Lorem. Non fugiat consectetur dolor anim adipisicing incididunt laboris ex qui.\r\n',
    price: 3046,
    category: 'ipsum'
  },
  {
    name: 'Gibbs',
    description:
      'Adipisicing nulla incididunt veniam excepteur magna incididunt sit minim quis. Ex ex quis proident fugiat dolore eu velit mollit est. Nostrud fugiat magna quis anim magna irure. Mollit ea incididunt adipisicing reprehenderit ullamco.\r\n',
    price: 1322,
    category: 'culpa'
  },
  {
    name: 'Kerry',
    description:
      'Ipsum fugiat pariatur voluptate magna minim enim occaecat sunt excepteur enim pariatur. Sunt velit reprehenderit irure exercitation non. Aliqua laboris enim nulla occaecat magna dolore reprehenderit sit tempor do magna dolor commodo ut. Ut ullamco eiusmod irure aliqua. Magna incididunt sunt ullamco minim quis est dolor ut sit. Culpa laboris et non irure ex ipsum.\r\n',
    price: 503,
    category: 'mollit'
  },
  {
    name: 'Letitia',
    description:
      'Veniam laboris laboris consequat irure excepteur sunt minim. Id irure velit quis sunt velit commodo amet cillum voluptate sint occaecat. Laboris aliquip nisi culpa do pariatur est duis pariatur qui in veniam. Voluptate cillum irure ex exercitation voluptate dolor est. Ullamco labore est aliqua sit amet.\r\n',
    price: 1304,
    category: 'consectetur'
  },
  {
    name: 'Bruise salve',
    description:
      'Soothe your woes after drunken bar fights with organic arnica and shea butter',
    price: 1499,
    category: 'body'
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

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
