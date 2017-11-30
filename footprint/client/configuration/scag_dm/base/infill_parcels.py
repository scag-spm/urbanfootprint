# coding=utf-8

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

from django.contrib.gis.db import models
from footprint.main.models.geospatial.feature import Feature


__author__ = 'calthorpe_analytics'


class InfillParcels(Feature):

    scaguid16 = models.CharField(max_length=10, null=True, blank=True)
    apn = models.CharField(max_length=15, null=True, blank=True)
    inf_index = models.CharField(max_length=10, null=True, blank=True)
    city = models.CharField(max_length=30, null=True, blank=True)
    county = models.CharField(max_length=15, null=True, blank=True)
    notes = models.CharField(max_length=1024, null=True, blank=True)

    class Meta(object):
        abstract = True
        app_label = 'main'
