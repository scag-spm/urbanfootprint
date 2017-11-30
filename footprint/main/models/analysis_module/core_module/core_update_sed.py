
# UrbanFootprint v1.5
# Copyright (C) 2016 Calthorpe Analytics
#
# This file is part of UrbanFootprint version 1.5
#
# UrbanFootprint is distributed under the terms of the GNU General
# Public License version 3, as published by the Free Software Foundation. This
# code is distributed WITHOUT ANY WARRANTY, without implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
# Public License v3 for more details; see <http://www.gnu.org/licenses/>.

import logging
logger = logging.getLogger(__name__)

from footprint.main.models.geospatial.db_entity_keys import DbEntityKey

__author__ = 'calthorpe_analytics'


def update_sed_feature(config_entity, annotated_features):

    city_class = config_entity.db_entity_feature_class(DbEntityKey.CITY_BOUNDARY)

    city_pop16 = city_pop20 = city_pop35 = city_pop45 = 0
    city_hh16 = city_hh20 = city_hh35 = city_hh45 = 0
    city_emp16 = city_emp20 = city_emp35 = city_emp45 = 0

    for feature in annotated_features:
        city_pop16 += feature.pop16
        city_pop20 += feature.pop20
        city_pop35 += feature.pop35
        city_pop45 += feature.pop45

        city_hh16 += feature.hh16
        city_hh20 += feature.hh20
        city_hh35 += feature.hh35
        city_hh45 += feature.hh45

        city_emp16 += feature.emp16
        city_emp20 += feature.emp20
        city_emp35 += feature.emp35
        city_emp45 += feature.emp45

    base = city_class.objects.get(id=feature.city_boundary)

    base.pop16 = city_pop16
    base.pop20 = city_pop20
    base.pop35 = city_pop35
    base.pop45 = city_pop45

    base.hh16 = city_hh16
    base.hh20 = city_hh20
    base.hh35 = city_hh35
    base.hh45 = city_hh45

    base.emp16 = city_emp16
    base.emp20 = city_emp20
    base.emp35 = city_emp35
    base.emp45 = city_emp45

    base.save()
