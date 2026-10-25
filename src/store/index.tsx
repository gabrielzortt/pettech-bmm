import React, { ReactNode } from 'react';
import { FeedbackProviderBMM } from './FeedbackProvider';
import { AuthProviderBMM } from './AuthProvider';
import { FavoritosProviderBMM } from './FavoritosProvider';
import { CarrinhoProviderBMM } from './CarrinhoProvider';
import { PedidosProviderBMM } from './PedidosProvider';

export function ProvedoresBMM({ children: childrenBMM }: { children: ReactNode }) {
  return (
    <FeedbackProviderBMM>
      <AuthProviderBMM>
        <FavoritosProviderBMM>
          <CarrinhoProviderBMM>
            <PedidosProviderBMM>{childrenBMM}</PedidosProviderBMM>
          </CarrinhoProviderBMM>
        </FavoritosProviderBMM>
      </AuthProviderBMM>
    </FeedbackProviderBMM>
  );
}

export { useFeedbackBMM } from './FeedbackProvider';
export { useAuthBMM, usuarioPadraoBMM } from './AuthProvider';
export { useFavoritosBMM } from './FavoritosProvider';
export { useCarrinhoBMM, freteGratisAPartirDeBMM } from './CarrinhoProvider';
export { usePedidosBMM } from './PedidosProvider';
