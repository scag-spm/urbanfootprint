
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


class EntitlementParcels(Feature):

    scaguid16 = models.CharField(max_length=10, null=True, blank=True)
    apn = models.CharField(max_length=15, null=True, blank=True)
    tract_no = models.CharField(max_length=30, null=True, blank=True)
    dev_agmt = models.CharField(max_length=30, null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    date_appro = models.CharField(max_length=10, null=True, blank=True)
    date_start = models.CharField(max_length=10, null=True, blank=True)
    multi_par = models.IntegerField(null=True, blank=True)
    proj_type = models.CharField(max_length=30, null=True, blank=True)
    pop = models.IntegerField(null=True, blank=True)
    du_sf = models.IntegerField(null=True, blank=True)
    du_mf = models.IntegerField(null=True, blank=True)
    emp = models.IntegerField(null=True, blank=True)
    emp_type = models.CharField(max_length=30, null=True, blank=True)
    emp_sqft = models.DecimalField(max_digits=14, decimal_places=2, null=True)
    proj_phase = models.CharField(max_length=30, null=True, blank=True)
    time_limit = models.CharField(max_length=50, null=True, blank=True)
    acres = models.DecimalField(max_digits=14, decimal_places=2, null=True)
    city = models.CharField(max_length=30, null=True, blank=True)
    county = models.CharField(max_length=15, null=True, blank=True)
    notes = models.CharField(max_length=1024, null=True, blank=True)
    is_modified = models.CharField(max_length=5, null=True, blank=True)

    class Meta(object):
        abstract = True
        app_label = 'main'
