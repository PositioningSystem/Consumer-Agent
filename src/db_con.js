import { Sequelize, Model, DataTypes, QueryTypes } from 'sequelize';
import axios from 'axios';
import https from 'https';
const user = 'postgres'
const host = 'db'
const database = 'db_posicionamiento'
const password = 'Ceit_1234'
const port = '5432'
const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  acquire: 90000,
  pool: {
    acquire: 90000
  },
  logging: false
})

const row = sequelize.define(
  'tag_pos',
  {
    createdAt: {
      type: Sequelize.DATE(6),
      field: 'datetime',
      primaryKey: true
    },
    x: Sequelize.DOUBLE,
    y: Sequelize.DOUBLE,
    z: Sequelize.DOUBLE,
    hpl: Sequelize.DOUBLE,
    id_tag_fk: Sequelize.INTEGER,
    vpl: Sequelize.DOUBLE,
    tag_name: Sequelize.STRING
  }, {
  timestamps: true,
  updatedAt: false,
  deletedAt: false
}
);

const alert = sequelize.define(
  'tag_alert',
  {
    createdAt: {
      type: Sequelize.DATE(6),
      field: 'datetime',
      primaryKey: true
    },
    id_tag_fk: Sequelize.INTEGER,
    alert_type_fk: Sequelize.STRING,
    deleted: Sequelize.BOOLEAN
  }, {
  timestamps: true,
  updatedAt: false,
  deletedAt: false
  // freezeTableName: true
}
);

export default async function insert(data) {

  let aux = JSON.parse(data)
  let id_tag_fk = await sequelize.query("SELECT id_tag FROM tag_refs where tag = '" + aux.tagID + "'", { type: QueryTypes.SELECT });
  if (id_tag_fk[0] != undefined) {
    // console.log(id_tag_fk[0])
    id_tag_fk = id_tag_fk[0]
    id_tag_fk = id_tag_fk.id_tag
  }
  if (id_tag_fk[0] != undefined) {
    // console.log(id_tag_fk)
    try {
      if(aux.ID_mensaje == "107"){
      //  let data = {
      //    // datetime: Date.now(),
      //      x: aux.x,
      //      y: aux.y,
      //      z: aux.z,
      //      hpl: 3*aux.hpl_1 ,
      //      id_tag_fk: id_tag_fk,
      //      vpl: aux.vpl,
      //      tag_name: aux.tagID
      //  };
        await row.create(
          {
            // datetime: Date.now(),
            x: aux.x,
            y: aux.y,
            z: aux.z,
            hpl: 3*aux.hpl_1 ,
            id_tag_fk: id_tag_fk,
            vpl: aux.vpl,
            tag_name: aux.tagID
          }
        );
        //const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        //process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1
        //axios.post('https://api:8001/api/v1/alert', data, { httpsAgent: httpsAgent }).catch(error => console.log(error))
        //console.log(aux.tagID + " coordinates inserted(" + aux.x + "," + aux.y + "," + aux.z + ")")
        // previous_data = data

      }else if(aux.ID_mensaje == "108"){
        if(aux.AlarmType==1){
          await alert.create(
            {
              // datetime: Date.now(),
              id_tag_fk: id_tag_fk,
              alert_type_fk: aux.ID_mensaje,
              deleted: false
            }
          );
          console.log(aux.tagID + " alert message inserted")
        }
      }
        
    } catch (e) {
      console.log(e)
    }

  }
  else {
    console.log(aux.tagID + " does not have frontend relation;")
  }
}