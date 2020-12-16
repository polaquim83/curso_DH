const autos = require("./autos.js");

const concesionaria = {
    autos : autos,
    buscarAuto : function (patente){
        for (let i = 0 ; i < autos.length ; i++)
            if (autos[i].patente == patente){
                return autos[i];
            }
        return null;
        },
    venderAuto : function (patente){
        let auto = this.buscarAuto(patente);
        auto.vendido = true;
        return auto;
    },
    autosParaLaVenta : function (){
        let disponibles = autos.filter(function (auto){
            return auto.vendido == false;
        })
        return disponibles;
    },
    autosNuevos : function (){
        let disponibles0Km = this.autosParaLaVenta();
        return disponibles0Km.filter (function (auto){
            return auto.km < 100;
        })
    },
    listaDeVentas : function (){
        let ventas = [0];
        for (let i = 0 ; i < autos.length ; i++){
            if (autos[i].vendido == true){
                ventas.push(autos[i].precio)
            }
        }
        return ventas;
    },
    totalDeVentas : function (){
        let totalVentas = (this.listaDeVentas()).reduce((acumulador,i) => acumulador + i);
        return totalVentas;
    },
    puedeComprar : function (auto,persona){
        return (auto.precio <= persona.capacidadDePagoTotal && (auto.precio / auto.cuotas) <= persona.capacidadDePagoEnCuotas) ? true : false;
        
    },
    autosQuePuedeComprar : function (persona){
        let disponibles = this.autosParaLaVenta();
        let quePuedeComprar = [];
        for (let i = 0 ; i < disponibles.length ; i++){
            if (this.puedeComprar(disponibles[i],persona)){
                quePuedeComprar.push(disponibles[i])
            }
        }
        return quePuedeComprar;
    }
};

// console.log(autos.indexOf()
// concesionaria.venderAuto('JJK116');
console.log(concesionaria.autosQuePuedeComprar({
    nombre: "Juan",
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000,
    }))
