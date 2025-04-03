import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "@/components/main";
import { useState } from "react";

const Plateau = ({ main, deplacerCarte, cartesAdversaire1, cartesAdversaire2 }) => {
  return (
    <div className="container-fluid plateau-container" style={{ height: "100vh", padding: "20px" }}>
      {/* Zone des adversaires */}
      <div className="row justify-content-between mb-5" style={{ height: "35%" }}>
        {/* Adversaire 1 */}
        <div className="col-5">
          <div className="opponent-zone bg-dark p-3 rounded-3 h-100">
            <h4 className="text-white mb-3">Adversaire 1</h4>
            <div className="d-flex gap-2 flex-wrap">
              {Array(5).fill().map((_, index) => (
                <div key={index} className="card-slot" style={{
                  width: "100px",
                  height: "140px",
                  border: "2px dashed #666",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.1)"
                }}>
                  {cartesAdversaire1?.[index] && (
                    <img 
                      src={cartesAdversaire1[index].img} 
                      alt={cartesAdversaire1[index].name}
                      className="w-100 h-100"
                      style={{ borderRadius: "6px", objectFit: "cover" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Adversaire 2 */}
        <div className="col-5">
          <div className="opponent-zone bg-dark p-3 rounded-3 h-100">
            <h4 className="text-white mb-3">Adversaire 2</h4>
            <div className="d-flex gap-2 flex-wrap">
              {Array(5).fill().map((_, index) => (
                <div key={index} className="card-slot" style={{
                  width: "100px",
                  height: "140px",
                  border: "2px dashed #666",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.1)"
                }}>
                  {cartesAdversaire2?.[index] && (
                    <img 
                      src={cartesAdversaire2[index].img} 
                      alt={cartesAdversaire2[index].name}
                      className="w-100 h-100"
                      style={{ borderRadius: "6px", objectFit: "cover" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zone centrale (pour éventuels éléments de jeu) */}
      <div className="row mb-5" style={{ height: "20%", background: "rgba(0,0,0,0.3)", borderRadius: "10px" }}></div>

      {/* Zone du joueur */}
      <div className="row" style={{ height: "35%" }}>
        <div className="col-12">
          <Main 
            cards={main} 
            placer={deplacerCarte}
            style={{ height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Plateau;