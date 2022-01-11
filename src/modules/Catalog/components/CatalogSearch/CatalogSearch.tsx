import React from 'react';
import {CatalogSearchContainer} from '@Catalog/components/CatalogSearch/CatalogSearch.styled';

/**
 * Поисковая строка в шапке для поиска по каталогу
 */
const CatalogSearch: React.FC = () => <CatalogSearchContainer>CatalogSearch</CatalogSearchContainer>;

export default React.memo(CatalogSearch);
